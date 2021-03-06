import { Component, OnInit } from '@angular/core';
import { ScenesService } from '../../services/scenes.service';
import { Observable } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { chevronRight32, pencil16 } from '@esri/calcite-ui-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {
  scenes$: Observable<Scene[]>;
  icon = chevronRight32;
  imgPath = environment.urlExpress;
  constructor(private scenesService: ScenesService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

}
