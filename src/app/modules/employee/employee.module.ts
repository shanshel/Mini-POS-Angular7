import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { EmployeeRoutingModule, routedComponents } from './employee-routing.module';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { EnrollmentsViewComponent } from './pages/enrollments-view/enrollments-view.component';

import { NbDialogModule, NbToastrModule, NbCheckboxModule } from '@nebular/theme';
import { EnrollmentCreateComponent } from './pages/enrollment-create/enrollment-create.component';
import { EmployeeViewOneComponent } from './pages/employee-view-one/employee-view-one.component';

import { DialogConfirmationComponent } from './pages/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  declarations: [
    routedComponents,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    EnrollmentsViewComponent,
    EnrollmentCreateComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent,
    EmployeeViewOneComponent,
    DialogConfirmationComponent
    
  ]
})
export class EmployeeModule { }
