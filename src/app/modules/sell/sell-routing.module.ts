import { SellComponent } from './sell.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellViewComponent } from './pages/sell-view/sell-view.component';


const routes: Routes = [{
  path: '',
  component: SellComponent,
  children: [
    {
        path: '',
        component: SellViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellRoutingModule { }

export const routedComponents = [
  SellComponent,
  SellViewComponent
];
