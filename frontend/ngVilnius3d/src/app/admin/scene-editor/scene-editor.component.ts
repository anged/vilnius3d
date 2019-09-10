import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, mergeMapTo, mergeMap } from 'rxjs/operators';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { BreadcrumbService } from 'angular-crumbs';
import { fileValidator } from './fileValidator';
import { exclamationMarkCircle16 } from "@esri/calcite-ui-icons";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.scss']
})
export class SceneEditorComponent implements OnInit {
  sceneForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    sceneUrl: ['', Validators.required],
    photo: this.formBuilder.group({
      url: ['']
    })
  });

  imgPath = environment.urlExpress;


  // check if scene should be updated, otherwise post new scene
  private shouldUpdate: boolean;
  private slug: string;
  imageUrl: string;
  iconMark = exclamationMarkCircle16;
  modal: BsModalRef;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private bsModalService: BsModalService) { }

  ngOnInit() {
    console.log('ROUTE', this.router);
    // TODO block UI when submiting  form


    this.route.url.pipe(
      tap(params => console.log('ROUTE', params))
    ).subscribe()

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.scenesService.getScene(params.get('slug')))
    ).subscribe((scene: Scene) => {
      // check if scene should be updated, otherwise post new scene
      // could be using only slug instead, because scene with slug should be always updated
      // to be more explicit we'll stray with shouldUpdate
      this.slug = scene ? `/${scene.slug}` : '';

      // check if scene exist and patch scene to form  for  existing components

      console.log('scene', this.slug)
      if (scene) {
        this.sceneForm.patchValue(scene);

        // Reset value to clear previous file inputs
        if (this.sceneForm.controls['img']) {
          this.sceneForm.controls['img'].reset();
        }

        if (scene.photo && scene.photo.url) {
          this.imageUrl = scene.photo.url;
        } else {
          this.imageUrl = '';
        }

        this.shouldUpdate = true;
      } else {
        this.shouldUpdate = false;
      }

      // add url control and it's validator
      // validator checks if imageUrl exists and knows whether we can pass validtion for empty file
      this.sceneForm.addControl('img', new FormControl('', fileValidator(this.imageUrl)));

    });
  }

  onFileChange(event) {
    console.log('F event', event)
    const file = event.target.files[0];
    this.sceneForm.controls['img'].setValue(file ? file : null);
    console.log("FORM", this.sceneForm.get('img'), this.sceneForm)
  }

  onSubmit() {
    console.log('Form Value', this.sceneForm.touched, this.sceneForm.valid);
    this.scenesService.saveScene(this.sceneForm.value, this.shouldUpdate, this.slug).subscribe((data) => {
      console.log('POST data', data);
      this.success =  data ? true : false;
      // TODO patch succussfully updated scene and update imageUrl
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.bsModalService.show(template, { class: 'modal-sm' });
  }

  confirmDelete(): void {
    this.modal.hide();
    this.scenesService.deleteScene(this.slug).subscribe(data => {
      console.log('POST data', data);
      // TODO redirect
      // Not addding any msg, just redirecting
      this.router.navigate(['/admin/dashboard/scenes'])
    });
  }

  decline(): void {
    this.modal.hide();
  }

}
