

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { EmployeesViewComponent } from './pages/employees-view/employees-view.component';
import { EnrollmentsViewComponent } from './pages/enrollments-view/enrollments-view.component';
import { EnrollmentCreateComponent } from './pages/enrollment-create/enrollment-create.component';
import { EmployeeViewOneComponent } from './pages/employee-view-one/employee-view-one.component';
import { DialogConfirmationComponent } from './pages/dialog-confirmation/dialog-confirmation.component';


const routes: Routes = [{
  path: '',
  component: EmployeeComponent,
  children: [
    {
        path: '',
        component: EmployeesViewComponent,
    },
    {
        path: 'create',
        component: EmployeeCreateComponent,
    }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }

export const routedComponents = [
  EmployeeCreateComponent,
  EmployeeComponent,
  EmployeeEditComponent,
  EmployeesViewComponent,
  EnrollmentsViewComponent,
  EnrollmentCreateComponent,
  EmployeeViewOneComponent,
  DialogConfirmationComponent
];
