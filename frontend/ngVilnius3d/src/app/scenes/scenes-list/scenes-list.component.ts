import { Component, OnInit } from '@angular/core';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ScenesRoutingService } from '../scenes-routing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss']
})
export class ScenesListComponent implements OnInit {
  scenes$: Observable<Scene[]>;
  imgPath = environment.urlExpress;

  constructor(private scenesService: ScenesService, private scenesRoutingService: ScenesRoutingService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

  setBg(img: string): string {
    return  `url(${this.imgPath}/${img})`;
  }

}
