import { Component, OnInit } from '@angular/core';

import { users24, i360View24, user24 } from "@esri/calcite-ui-icons";

@Component({
  selector: 'v3d-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  usersIcon = users24;
  scenesIcon = i360View24;
  userIcon = user24;
  constructor() { }

  ngOnInit() {
  }

}
