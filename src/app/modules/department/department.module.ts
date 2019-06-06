import { DepartmentEditComponent } from './pages/department-edit/department-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DepartmentRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    DepartmentEditComponent,
  ]
})
export class DepartmentModule { }
