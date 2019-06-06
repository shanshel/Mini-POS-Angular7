import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticComponent } from './statistic.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OperatorComponent } from './pages/operator/operator.component';
import { AccComponent } from './pages/acc/acc.component';

const routes: Routes = [{
  path: '',
  component: StatisticComponent,
  children: [
    {
        path: 'admin',
        component: AdminComponent,
    },
    {
        path: 'operator',
        component: OperatorComponent,
    },
    {
        path: 'accountant',
        component: AccComponent,
    },
    {
        path: 'siteadmin',
        component: AccComponent,
    },
 
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule { }

export const routedComponents = [
    StatisticComponent,
    AdminComponent,
    OperatorComponent,
    AccComponent

];
