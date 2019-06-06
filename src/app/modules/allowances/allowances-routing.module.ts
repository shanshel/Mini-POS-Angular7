import { AllowancesComponent } from './allowances.component';
import { ViewAllowancesComponent } from './pages/view-allowances/view-allowances.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: AllowancesComponent,
  children: [
    {
        path: 'view',
        component: ViewAllowancesComponent,
    }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllowancesRoutingModule { }

export const routedComponents = [
  AllowancesComponent,
  ViewAllowancesComponent
];
