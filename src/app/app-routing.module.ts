import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoggedInGuard } from './core/guards/logged-in-guard.service';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: 'app/modules/sell/sell.module#SellModule',
    canActivate: [],
  },

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
  {
    path: 'items',
    pathMatch: 'full',
    loadChildren: 'app/modules/items/items.module#ItemsModule',
    canActivate: [],
  },
  {
    path: 'sell',
    pathMatch: 'full',
    loadChildren: 'app/modules/sell/sell.module#SellModule',
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
