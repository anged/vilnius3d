import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Observable } from 'rxjs';
import { Scene } from '../models/scene.model';
import { ScenesService } from '../services/scenes.service';
import { CookieVilniusService } from '../services/cookie-vilnius.service';

@Component({
  selector: 'v3d-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('close', style({
        transform: 'translateX(-300px)'
      })),
      transition('open => close', [
        animate('0.2s')
      ]),
      transition('close => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class ScenesComponent implements OnInit {
  scenes$: Observable<Scene[]>;
  isSidebarActive = false;
  currentActiveScene: string;
  constructor(
    private cookieVilniusService: CookieVilniusService,
    private scenesService: ScenesService) { }

  ngOnInit() {
    this.scenes$ = this.scenesService.getPublicScenes();
    this.cookieVilniusService.checkCookie();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive; 
  }

  activeScene(event) {
    // Close sidebar when new scene is activated in mobile
    if (this.currentActiveScene !== event) {
      this.isSidebarActive = false;
    }
    
    this.currentActiveScene = event;
  }

}
