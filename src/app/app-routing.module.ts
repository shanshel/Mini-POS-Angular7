import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoggedInGuard } from './core/guards/logged-in-guard.service';

const routes: Routes = [



  {
    path: 'auth',
    loadChildren: 'app/modules/auth/auth.module#AuthModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    pathMatch: 'full',
    loadChildren: 'app/modules/customers/customers.module#CustomersModule',
    canActivate: [],
  },
  {
    path: 'invoices',
    pathMatch: 'full',
    loadChildren: 'app/modules/invoices/invoices.module#InvoicesModule',
    canActivate: [],
  },
 
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
