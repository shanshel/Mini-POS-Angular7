import { BankService } from './../../../../core/services/http/bank/bank.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ItemService } from '../../../../core/services/http/item.service';

@Component({
  selector: 'ngx-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  @Input() item = null;
  _form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _httpItem : ItemService,
    private router: Router,
    protected ref: NbDialogRef<ItemCreateComponent>

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
        Validators.required
      ]),
      buy_price: new FormControl('', [
        Validators.required,
        CustomValidators.number
      ]),
      sell_price: new FormControl('', [
        Validators.required,
        CustomValidators.number
      ]),
      barcode: new FormControl('', [
        CustomValidators.number
      ]),
      quantity: new FormControl('', [
        CustomValidators.number
      ]),
    });
  }

  private buildEditForm() {
    this._form = this.fb.group({
      name: new FormControl(this.item.name, [
        Validators.required
      ]),
      buy_price: new FormControl(this.item.buy_price, [
        Validators.required,
        CustomValidators.number
      ]),
      sell_price: new FormControl(this.item.sell_price, [
        Validators.required,
        CustomValidators.number
      ]),
      barcode: new FormControl(this.item.barcode, [
        CustomValidators.number
      ]),
      quantity: new FormControl(this.item.quantity, [
        CustomValidators.number
      ]),
      id: new FormControl(this.item.id, [
        Validators.required
      ]),
    });
  }


  onSubmit() {
    if (this.item) {

       this._httpItem.UpdateItem(this._form.value, this._form.value.id).subscribe(res => {
          this.dismiss();
        });

    } else {
       this._httpItem.AddItem(this._form.value).subscribe(res => {
        this.dismiss();
       });
    }
  }

  dismiss(){
    this.ref.close();
  }
}
