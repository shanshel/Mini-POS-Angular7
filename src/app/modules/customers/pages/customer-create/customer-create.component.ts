import { BankService } from './../../../../core/services/http/bank/bank.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  @Input() item = null;
  _form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _httpBank : BankService,
    private router: Router,
    protected ref: NbDialogRef<CustomerCreateComponent>

    ) {

     }

  ngOnInit() {
    if (this.item) {
      this.buildEditForm();
    }
    else {
      this.buildAddForm();
    }

  }

  private buildAddForm() {
    this._form = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        CustomValidators.rangeLength([1, 500])
      ]),
      phone: new FormControl('', [
        Validators.required, 
        CustomValidators.rangeLength([7, 12]),
        CustomValidators.number,
      ]),
    });
  }

  private buildEditForm() {
    this._form = this.fb.group({
      name: new FormControl(this.item.name, [
        Validators.required,
        CustomValidators.rangeLength([1, 500])
      ]),
      phone: new FormControl(this.item.name, [
        Validators.required, 
        CustomValidators.rangeLength([7, 12]),
        CustomValidators.number,
      ]),
      id: new FormControl(this.item.id, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.item) {

       this._httpBank.updateBank(this._form.value).subscribe(res => {
          this.dismiss();
        });

    } else {
       this._httpBank.addBank(this._form.value).subscribe(res => {
        this.dismiss();
       });
    }
  }

  dismiss(){
    this.ref.close();
  }
}
