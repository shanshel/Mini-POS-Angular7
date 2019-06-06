import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { CustomersRoutingModule, routedComponents } from './customers-routing.module';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    CustomerCreateComponent
  ],
})
export class CustomersModule { }
