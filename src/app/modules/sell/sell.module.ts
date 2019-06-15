import { SellRoutingModule, routedComponents } from './sell-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SellRoutingModule,
    NbDialogModule.forChild(),
    AngularMultiSelectModule,



  ],
  entryComponents: [
  ],
})
export class SellModule { }
