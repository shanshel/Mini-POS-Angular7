import { DepartmentEditComponent } from './pages/department-edit/department-edit.component';
import { DepartmentCreateComponent } from './pages/department-create/department-create.component';
import { DepartmentsViewComponent } from './pages/departments-view/departments-view.component';
import { SubDepartmentsViewComponent } from './pages/sub-departments-view/departments-view.component';
import { DepartmentComponent } from './department.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: DepartmentComponent,
  children: [
    {
        path: '',
        component: DepartmentsViewComponent,
    },
    {
        path: 'create',
        component: DepartmentCreateComponent,
    },
    {
      path: 'sub-depts',
      component: SubDepartmentsViewComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule { }

export const routedComponents = [
  DepartmentComponent,
  DepartmentsViewComponent,
  DepartmentCreateComponent,
  DepartmentEditComponent,
  SubDepartmentsViewComponent

 
];
