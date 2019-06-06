import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EnrollmentCreateComponent } from './pages/enrollment-create/enrollment-create.component';
import { NbDialogModule } from '@nebular/theme';
import { UserAccountEditComponent } from './pages/user-account-edit/user-account-edit.component';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    NbDialogModule.forChild(),

  ],
  entryComponents: [
    EnrollmentCreateComponent,
    UserAccountEditComponent
  ],
})
export class UserModule { }
