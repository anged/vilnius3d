import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { Observable } from 'rxjs';
import { ScenesRoutingService } from '../scenes-routing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenesListComponent implements OnInit {
  @Output() changeScene = new EventEmitter<string>();
  scenes$: Observable<Scene[]>;
  imgPath = environment.urlExpress;
  defaultImage = '/assets/img/default.jpg'

  constructor(private scenesService: ScenesService, private scenesRoutingService: ScenesRoutingService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

  setBg(img: string): string {
    return  this.imgPath + '/' + img;
  }

  activateScene(slug: string) {
    this.changeScene.emit(slug);
  }

}
