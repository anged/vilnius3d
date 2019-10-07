import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'v3d-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  date = new Date().getFullYear();
  constructor() { }

}
