import { BankCreateComponent } from './pages/bank-create/bank-create.component';
import { BankRoutingModule, routedComponents } from './bank-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BankRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    BankCreateComponent
  ],
})
export class BankModule { }
