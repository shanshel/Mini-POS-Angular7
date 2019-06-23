import { CustomerService } from './../../../../core/services/http/customer/customer.service';
import { BankService } from './../../../../core/services/http/bank/bank.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InvoiceService } from '../../../../core/services/http/invoice.service';

@Component({
  selector: 'ngx-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {
  @Input() item = null;
  _form: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = { 
        text: "اختر الزبون",
        selectAllText: 'تحديد الكل',
        unSelectAllText: 'الغاء التحديد',
        classes: "myclass custom-class",
        primaryKey: "id",
        labelKey: "name",
        noDataLabel: "بحث الزبائن",
        enableSearchFilter: true,
        searchBy: ['name'],
        singleSelection: true,
        searchAutofocus: true,
        maxHeight: 500,
      }; 
      
    onItemSelect(item:any){
      this._form.controls.customer_id.setValue(item.id);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log("test");
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

    onSearch(evt: any) {
        this.dropdownList = [];
        this._httpCustomer.getCustomers({search: evt.target.value})
            .subscribe(res => {
                this.dropdownList = res['data'];
            }, error => {

            });
    }

  constructor(
    private fb: FormBuilder,
    private _httpCustomer : CustomerService,
    private _httpInvoice : InvoiceService,
    private router: Router,
    protected ref: NbDialogRef<InvoiceCreateComponent>

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
      total_amount: new FormControl('', [
        Validators.required, 
        CustomValidators.number,
      ]),
      payed_amount: new FormControl('', [
        Validators.required, 
        CustomValidators.number,
      ]),
      selected_customer: new FormControl('', [
        Validators.required,
      ]),
      customer_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  private buildEditForm() {
    this._form = this.fb.group({
      total_amount: new FormControl('', [
        Validators.required, 
        CustomValidators.number,
      ]),
      payed_amount: new FormControl('', [
        Validators.required, 
        CustomValidators.number,
      ]),
      id: new FormControl(this.item.id, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.item) {

       this._httpInvoice.UpdateInvoice(this._form.value, this.item.id).subscribe(res => {
          this.dismiss();
        });

    } else {
      console.log(this._form.value);
       this._httpInvoice.AddInvoice(this._form.value).subscribe(res => {
        this.dismiss();
       });
    }
  }

  dismiss(){
    this.ref.close();
  }
}
