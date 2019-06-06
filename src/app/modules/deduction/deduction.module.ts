import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeductionComponent } from './dialog/add-deduction/add-deduction.component';
import { EditDeductionComponent } from './dialog/edit-deduction/edit-deduction.component';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule, NbCheckboxModule } from '@nebular/theme';
import { DeductionRoutingModule, dRoutedComponents } from './deduction-routing.module';


@NgModule({
  declarations: [
    ...dRoutedComponents,
    AddDeductionComponent,
    EditDeductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeductionRoutingModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    
    AddDeductionComponent,
    EditDeductionComponent
  ]
})
export class DeductionModule { }
