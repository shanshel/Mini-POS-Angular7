import { BankCreateComponent } from './pages/bank-create/bank-create.component';
import { BankViewComponent } from './pages/bank-view/bank-view.component';
import { BankComponent } from './bank.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: BankComponent,
  children: [
    {
        path: '',
        component: BankViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingModule { }

export const routedComponents = [
  BankComponent,
  BankCreateComponent,
  BankViewComponent,
];
