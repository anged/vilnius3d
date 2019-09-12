import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-home-scenes',
  templateUrl: './home-scenes.component.html',
  styleUrls: ['./home-scenes.component.scss']
})
export class HomeScenesComponent implements OnInit {
  scenes$: Observable<Scene[]>;
  imgPath = environment.urlExpress;

  constructor(private scenesService: ScenesService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getScenes();
  }

  setBg(img: string): string {
    return  `url(${this.imgPath}/${img})`;
  }

}
