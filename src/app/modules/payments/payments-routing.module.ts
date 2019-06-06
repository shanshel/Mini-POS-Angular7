import { PaymentsComponent } from './payments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPaymentsComponent } from './get-payments/get-payments.component';
import { CalculatePaymentComponent } from './calculate-payment/calculate-payment.component';

const routes: Routes = [{
  path: '',
  component: PaymentsComponent,
  children: [
    {
        path: '',
        component: GetPaymentsComponent,
    },
    {
      path: 'calculate-payment',
      component: CalculatePaymentComponent,
  }
],
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule { }

export const routedComponents = [
  GetPaymentsComponent,
  PaymentsComponent,
  CalculatePaymentComponent
];
