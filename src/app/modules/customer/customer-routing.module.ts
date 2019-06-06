import { CustomerComponent } from './customer.component';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: CustomerComponent,
    children: [
      {
          path: '',
          component: CustomerInfoComponent,
      },
     
  ],
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CustomerRoutingModule { }
  
  export const routedComponents = [
    CustomerComponent,
    CustomerInfoComponent,
  ];
  