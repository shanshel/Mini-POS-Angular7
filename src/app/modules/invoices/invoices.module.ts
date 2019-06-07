import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { InvoicesRoutingModule, routedComponents } from './invoices-routing.module';
import { InvoiceCreateComponent } from './pages/invoice-create/invoice-create.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InvoicesRoutingModule,
    NbDialogModule.forChild(),
    AngularMultiSelectModule,
  ],
  entryComponents: [
    InvoiceCreateComponent
  ],
})
export class InvoicesModule { }
