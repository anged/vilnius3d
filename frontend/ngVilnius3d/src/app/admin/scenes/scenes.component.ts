import { Component, OnInit } from '@angular/core';
import { ScenesService } from '../../services/scenes.service';
import { Observable } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { chevronRight32 } from '@esri/calcite-ui-icons';

@Component({
  selector: 'v3d-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {
  scenes$: Observable<Scene[]>;
  arrowR = chevronRight32; 
  constructor(private scenesService: ScenesService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

}
