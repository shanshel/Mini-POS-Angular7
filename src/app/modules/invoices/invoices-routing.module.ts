
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoiceViewComponent } from './pages/invoice-view/invoice-view.component';
import { InvoiceCreateComponent } from './pages/invoice-create/invoice-create.component';


const routes: Routes = [{
  path: '',
  component: InvoicesComponent,
  children: [
    {
        path: '',
        component: InvoiceViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule { }

export const routedComponents = [
  InvoicesComponent,
  InvoiceCreateComponent,
  InvoiceViewComponent,
];
