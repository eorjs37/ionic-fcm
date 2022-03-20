import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-route-page',
  templateUrl: './route-page.page.html',
  styleUrls: ['./route-page.page.scss'],
})
export class RoutePagePage implements OnInit {
  private id = -1;
  constructor(route: ActivatedRoute) {
    this.id = Number(route.snapshot.params.id);
  }

  ngOnInit() {
  }

}
