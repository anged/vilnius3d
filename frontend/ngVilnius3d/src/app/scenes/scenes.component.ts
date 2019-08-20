import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'v3d-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0%)'
      })),
      state('close', style({
        transform: 'translateX(-100%)'
      })),
      transition('open => close', [
        animate('0.2s')
      ]),
      transition('close => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('sceneAnimation', [
      state('open', style({
        width: 'calc(100% - 300px)'
      })),
      state('close', style({
        width: '100%'
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
  isSidebarActive = true;
  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive; 
  }
}
