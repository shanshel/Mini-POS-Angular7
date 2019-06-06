import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    LoginComponent,
    RedirectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ]
})
export class AuthModule { }
