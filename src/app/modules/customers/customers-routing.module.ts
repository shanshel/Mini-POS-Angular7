import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerViewComponent } from './pages/customer-view/customer-view.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';


const routes: Routes = [{
  path: '',
  component: CustomersComponent,
  children: [
    {
        path: '',
        component: CustomerViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }

export const routedComponents = [
  CustomersComponent,
  CustomerCreateComponent,
  CustomerViewComponent,
];
