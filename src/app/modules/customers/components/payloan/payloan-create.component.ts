import { CustomerService } from './../../../../core/services/http/customer/customer.service';
import { BankService } from './../../../../core/services/http/bank/bank.service';
import { Component, OnInit, Input, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InvoiceService } from '../../../../core/services/http/invoice.service';

@Component({
  selector: 'ngx-customer-payloan',
  templateUrl: './payloan-create.component.html',
  styleUrls: ['./payloan-create.component.scss']
})
export class PayloanComponent implements OnInit {
  @Input() customer = null;
  _form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    protected ref: NbDialogRef<PayloanComponent>,
    private _httpCustomer: CustomerService,
    private _httpInvoice: InvoiceService,

    ) {

     }

  ngOnInit() {
  
    this.buildAddForm();

  }

  

  private buildAddForm() {
    this._form = this.fb.group({
      customer_id: new FormControl(this.customer.id, [
        Validators.required,
      ]),
      amount: new FormControl('', [
        Validators.required,
        CustomValidators.number,
      ])
    });
  }

  onSubmit() {
    this._httpInvoice.PayFixedAmount(this._form.value).subscribe(res => {
      this.dismiss();
    });
  }

  dismiss(){
    this.ref.close();
  }
}
