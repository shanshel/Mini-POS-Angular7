import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent, NbRegisterComponent, NbLogoutComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
              path: 'login',
              component: LoginComponent,
            },
            {
              path: 'redirect',
              component: RedirectComponent,
            },
        ],
        
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}