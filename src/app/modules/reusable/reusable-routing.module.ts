

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReusableComponent } from './reusable.component';
import { ReusableViewPageComponent } from './pages/reusable-view-page/reusable-view-page.component';
import { ReusableCreatePageComponent } from './pages/reusable-create-page/reusable-create-page.component';
import { ReusableDialogComponent } from './pages/reusable-view-page/reusable-dialog/reusable-dialog.component';
import { ReusableChartPageComponent } from './pages/reusable-chart-page/reusable-chart-page.component';



const routes: Routes = [{
  path: '',
  component: ReusableComponent,
  children: [
    {
        path: 'view',
        component: ReusableViewPageComponent,
    },
    {
        path: 'create',
        component: ReusableCreatePageComponent,
    },
    {
      path: 'chart',
      component: ReusableChartPageComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReusableRoutingModule { }

export const routedComponents = [
  ReusableComponent,
  ReusableViewPageComponent,
  ReusableCreatePageComponent,
  ReusableDialogComponent,
  ReusableChartPageComponent
];
