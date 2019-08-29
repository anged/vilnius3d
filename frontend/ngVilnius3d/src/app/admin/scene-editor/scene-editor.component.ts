import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, mergeMapTo } from 'rxjs/operators';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { BreadcrumbService } from 'angular-crumbs';
import { fileValidator } from './fileValidator';
import { exclamationMarkCircle16 } from "@esri/calcite-ui-icons";

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

  imageUrl: string;

  iconMark = exclamationMarkCircle16;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private r: Router,
    private scenesService: ScenesService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('ROUTE', this.r)


    this.route.url.pipe(
      tap(params => console.log('ROUTE', params))
    ).subscribe()

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.scenesService.getScene(params.get('slug')))
    ).subscribe((scene: Scene) => {
      console.log('scene', scene)
      // check if scene exist and patch scene to form  for  existing components
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

      }
      // add url control and it's validator
      // validator checks if imageUrl exists and knows whether we can pass empty file
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
      this.scenesService.saveScene(this.sceneForm.value).subscribe(data => {
        console.log('POST data', data);
      });

  }

}
