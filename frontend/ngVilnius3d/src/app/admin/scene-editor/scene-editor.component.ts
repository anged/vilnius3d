import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, mergeMapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { FormBuilder } from '@angular/forms';
import { BreadcrumbService } from 'angular-crumbs';

@Component({
  selector: 'v3d-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.scss']
})
export class SceneEditorComponent implements OnInit {
  sceneForm = this.formBuilder.group({
    title: [''],
    content: [''],
    description: [''],
    sceneUrl: [''],
    photo: ['']
    // photo: this.formBuilder.group({
    //   ext: [''],
    //   hash: [''],
    //   url: [''],
    //   mime: [''],
    //   name: [''],
    //   provider: [''],
    //   public_id: [],
    //   sha256: [''],
    //   size: [''],
    // })
  });

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private r: Router,
    private scenesService: ScenesService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('ROUTE', this.r)

    
    this.route.url.pipe(
      tap(params =>console.log('ROUTE', params))
    ).subscribe()

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.scenesService.getScene(params.get('slug')))
    ).subscribe((scene: Scene) => {
      this.sceneForm.patchValue(scene);
    })

  }

  onFileChange(event) {
    console.log('F event', event)
    const file = event.target.files[0];
    this.sceneForm.controls['photo'].setValue(file ? file : null);
    console.log("FORM", this.sceneForm)
  }

  onSubmit() {
    console.log('Form Value', this.sceneForm.value);
    this.scenesService.saveScene(this.sceneForm.value).subscribe(data => {
      console.log('POST data', data);
    });
  }

}
