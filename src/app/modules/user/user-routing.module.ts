
import { UserComponent } from './user.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersViewComponent } from './pages/users-view/users-view.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { EnrollmentCreateComponent } from './pages/enrollment-create/enrollment-create.component';
import { UserAccountEditComponent } from './pages/user-account-edit/user-account-edit.component';


const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
        path: '',
        component: UsersViewComponent,
    },
    {
        path: 'create',
        component: UserCreateComponent,
    }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserComponent,
  UsersViewComponent,
  UserCreateComponent,
  EnrollmentCreateComponent,
  UserAccountEditComponent
];
