import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutePagePage } from './route-page.page';

const routes: Routes = [
  {
    path: '',
    component: RoutePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutePagePageRoutingModule {}
