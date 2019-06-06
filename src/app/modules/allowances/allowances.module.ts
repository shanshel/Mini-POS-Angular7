import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { routedComponents, AllowancesRoutingModule } from './allowances-routing.module';
import { DialogAddAllowancesComponent } from './dialog/add-allowances/add-allowances.component';
import { DialogEditAllowancesComponent } from './dialog/edit-allowances/edit-allowances.component';

@NgModule({
  declarations: [
    ...routedComponents,
    DialogAddAllowancesComponent,
    DialogEditAllowancesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AllowancesRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    DialogAddAllowancesComponent,
    DialogEditAllowancesComponent
  ]
})
export class AllowancesModule { }
