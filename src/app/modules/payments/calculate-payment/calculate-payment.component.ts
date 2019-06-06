import { Component, OnInit } from '@angular/core';
import { AppTokenService } from '../../../shared/services/app-token.service';
import { PaymentsService } from './../../../core/services/http/payments/payments.service';

@Component({
  selector: 'ngx-calculate-payment',
  templateUrl: './calculate-payment.component.html',
  styleUrls: ['./calculate-payment.component.scss']
})
export class CalculatePaymentComponent implements OnInit {
id;

  constructor(
    private appToken: AppTokenService,
    private _payments: PaymentsService,
  ) { }

  ngOnInit() {
    this.id = this.appToken.getId();
  }

  onSubmit(){
    this._payments.CalculatePayments(this.id).subscribe((res) => {
      
    });
  }
}
