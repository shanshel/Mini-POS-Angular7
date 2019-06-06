import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { PaymentInfoComponent } from './get-payments/dialog/payment-info/payment-info.component';
import {NgxPrintModule} from 'ngx-print';
import { ViewjsonfileComponent } from './viewjsonfile/viewjsonfile.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    ...routedComponents,
    PaymentInfoComponent,
    ViewjsonfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentsRoutingModule,
    NbDialogModule.forChild(),
    NgxPrintModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    PaymentInfoComponent,
    ViewjsonfileComponent
  ]
})
export class PaymentsModule { }
