import { Component, OnInit } from '@angular/core';
import { widgetsTabs24, chevronRight16 } from '@esri/calcite-ui-icons';

@Component({
  selector: 'v3d-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashbIcon = widgetsTabs24;
  arrowR = chevronRight16;
  constructor() { }

  ngOnInit() {
  }

}
