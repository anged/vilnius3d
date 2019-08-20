import { Component, OnInit } from '@angular/core';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ScenesRoutingService } from '../scenes-routing.service';

@Component({
  selector: 'v3d-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss']
})
export class ScenesListComponent implements OnInit {
  scenes$: Observable<Scene[]>;

  constructor(private scenesService: ScenesService, private scenesRoutingService: ScenesRoutingService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

}
