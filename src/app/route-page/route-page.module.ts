import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutePagePageRoutingModule } from './route-page-routing.module';

import { RoutePagePage } from './route-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutePagePageRoutingModule
  ],
  declarations: [RoutePagePage]
})
export class RoutePagePageModule {}
