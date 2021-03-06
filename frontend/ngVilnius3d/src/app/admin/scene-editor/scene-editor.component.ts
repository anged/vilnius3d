import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { switchMap, catchError } from 'rxjs/operators';
import { takeUntil } from "rxjs/operators";
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { exclamationMarkCircle16 } from "@esri/calcite-ui-icons";
import { fileValidator } from './fileValidator';

import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { BreadcrumbService } from 'angular-crumbs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'v3d-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.scss']
})
export class SceneEditorComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  sceneForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    scene: ['', [Validators.required, Validators.pattern('^(https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]]
  });

  imgPath = environment.urlExpress;
  isFormSubmitting = false;

  // check if scene should be updated, otherwise post new scene
  private shouldUpdate: boolean;
  private id: string;
  imageUrl: string;
  iconMark = exclamationMarkCircle16;
  modal: BsModalRef;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService,
    private toastS: ToastrService
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.scenesService.getScene(params.get('id')))
    ).subscribe((scene: Scene) => {
      // check if scene should be updated, otherwise post new scene
      // could be using only slug instead, because scene with slug should be always updated
      // to be more explicit we'll stray with shouldUpdate
      this.id = scene ? `/${scene.id}` : '';

      // check if scene exist and patch scene to form  for  existing components
      if (scene) {
        this.sceneForm.patchValue(scene);

        // Reset value to clear previous file inputs
        if (this.sceneForm.controls['imgFile']) {
          this.sceneForm.controls['imgFile'].reset();
        }

        if (scene.img) {
          this.imageUrl = scene.img;
        } else {
          this.imageUrl = '';
        }

        this.shouldUpdate = true;
      } else {
        this.shouldUpdate = false;
      }

      // add url control and it's validator
      // validator checks if imageUrl exists and knows whether we can pass validation for empty file
      this.sceneForm.addControl('imgFile', new FormControl('', fileValidator(this.imageUrl)));

    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.sceneForm.controls['imgFile'].setValue(file ? file : null);
  }

  onSubmit() {
    this.isFormSubmitting = true;
    this.scenesService.saveScene(this.sceneForm.value, this.shouldUpdate, this.id).pipe(
      catchError((err) => {
        this.toastS.error('Scenos nepavyko įkelti / atnaujinti');
        return of({ error: true});
      }),
      takeUntil(this.destroy$)
    )
    .subscribe((data: any) => {
      this.isFormSubmitting = false;

      // TODO patch succussfully updated scene and update imageUrl
      const scene = data.scene;
      if (scene) {
        // Toast
        this.toastS.success('Scena sėkmingai atnaujinta')

        this.sceneForm.controls['imgFile'].reset();
        this.sceneForm.controls['imgFile'].setValue(null);
        this.shouldUpdate = true;
        this.sceneForm.patchValue(scene);
        this.imageUrl = scene.img;

      } else if (data.success) {
        this.sceneForm.reset();
        this.toastS.success('Scena sėkmingai įkelta')
      }

        // TODO use renderer
        this.fileInput.nativeElement.value = null
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.bsModalService.show(template, { class: 'modal-sm' });
  }

  confirmDelete(): void {
    this.modal.hide();
    this.scenesService.deleteScene(this.id).subscribe((data: any) => {
      console.log('POST data', data);
      if (data.success) {
        this.toastS.success('Scena sėkmingai ištrinta')
        this.router.navigate(['/admin/dashboard/scenes'])
      } else {
        this.toastS.error('Scenos nepavyko ištrinti')
      }

    });
  }

  decline(): void {
    this.modal.hide();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
