import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';



@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
    NbDialogModule.forChild(),

  ],
  entryComponents: [
    
  ],
})
export class CustomerModule { }