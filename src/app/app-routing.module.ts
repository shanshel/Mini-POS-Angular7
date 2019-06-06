import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoggedInGuard } from './core/guards/logged-in-guard.service';

const routes: Routes = [
  {
    path: 'departments',
    loadChildren: 'app/modules/department/department.module#DepartmentModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'employees',
    loadChildren: 'app/modules/employee/employee.module#EmployeeModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'payments',
    loadChildren: 'app/modules/payments/payments.module#PaymentsModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'allowances',
    loadChildren: 'app/modules/allowances/allowances.module#AllowancesModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'deductions',
    loadChildren: 'app/modules/deduction/deduction.module#DeductionModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'jobtitle',
    loadChildren: 'app/modules/jobtitle/jobtitle.module#JobtitleModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'users',
    loadChildren: 'app/modules/user/user.module#UserModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'reusable',
    loadChildren: 'app/modules/reusable/reusable.module#ReusableModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'statistics',
    loadChildren: 'app/modules/statistic/statistic.module#StatisticModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'auth',
    loadChildren: 'app/modules/auth/auth.module#AuthModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    pathMatch: 'full',
    loadChildren: 'app/modules/customer/customer.module#CustomerModule',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'bank',
    pathMatch: 'full',
    loadChildren: 'app/modules/bank/bank.module#BankModule',
    canActivate: [LoggedInGuard],
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
