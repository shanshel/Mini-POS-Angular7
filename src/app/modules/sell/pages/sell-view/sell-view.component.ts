import { CustomerService } from './../../../../core/services/http/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { ItemService } from '../../../../core/services/http/item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { InvoiceService } from '../../../../core/services/http/invoice.service';
@Component({
  selector: 'ngx-sell-view',
  templateUrl: './sell-view.component.html',
  styleUrls: ['./sell-view.component.scss']
})
export class SellViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  
  invoiceInfo = {
    invoiceNumber: "",
    totalPrice: 0,
    payed_amount: -1,
    date: new Date(),
  };

  items: any[] = [];
  dropdownList = [];
  selectedItems = [];
  tableItems = [];
  dropdownSettings = {
    text: "اختر المادة",
    selectAllText: 'تحديد الكل',
    unSelectAllText: 'الغاء التحديد',
    classes: "myclass custom-class",
    primaryKey: "id",
    labelKey: "name",
    noDataLabel: "بحث المواد",
    enableSearchFilter: true,
    searchBy: ['name'],
    singleSelection: false,
    searchAutofocus: true,
    maxHeight: 500,
  };

  customerDropdownList = [];
  selectedCustomers = [];
  customerDropdownSettings = {
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

  _reciptForm;

      
    onItemSelect(item:any){
      this.addItemToTable(item);
    }
    OnItemDeSelect(item:any){
      this.removeItemFromTable(item);
    }

    isSearchInTimeOut;
    onSearch(evt: any) {
        if (this.isSearchInTimeOut) {
          return;
        }
        console.log(evt.target.value);
        this.isSearchInTimeOut = true;
        this.dropdownList = [];
        this._httpItems.GetItems({search: evt.target.value})
            .subscribe(res => {
                if (res['data'].length === 1){
                  this.pushToSelected(res['data'][0]);
                  this.dropdownList = [];
                } else {
                  this.dropdownList = res['data'];
                }
                this.isSearchInTimeOut = false;
            }, error => {
              this.isSearchInTimeOut = false;
            });
    }

    onCustomerSelect(customer:any) {
      console.log(customer);
    }

    onCustomerSearch(evt: any){
      if (this.isSearchInTimeOut) {
        return;
      }

      this.isSearchInTimeOut = true;
      this.customerDropdownList = [];
      this._httpCustomer.getCustomers({search: evt.target.value})
        .subscribe(res => {
            this.customerDropdownList = res['data'];
            this.isSearchInTimeOut = false;
        }, error => {
          this.isSearchInTimeOut = false;
        });
    }

    pushToSelected(itemToAdd){
      let isExsist = false;
      for (let x = 0; x < this.selectedItems.length; x++){
        if (this.selectedItems[x].id === itemToAdd.id) {
          isExsist = true;
        }
      }

      if (!isExsist){
        this.selectedItems.push(itemToAdd);
      }

      this.addItemToTable(itemToAdd);
    }

    removeItemFromTable(item){
      for (let x = 0; x < this.tableItems.length; x++){
        if (this.tableItems[x].id === item.id){
          this.tableItems.splice(x, 1);
        }
      }
      this.calcluteTotalPrice();
    }
    
    oddItemInTable(item) {
      for (let x = 0; x < this.tableItems.length; x++){
        if (this.tableItems[x].id === item.id){
          this.tableItems[x].count -= 1;
          if (this.tableItems[x].count < 1){
            this.removeItemFromTable(item);
          }
        }
      }
      this.calcluteTotalPrice();
    }
    
    addItemToTable(item){
      let itemExist = false;
      let itemIndex;
      let newItem = {
        id: item.id,
        count: 1,
        barcode: item.barcode,
        buy_price: item.buy_price,
        name: item.name,
        quantity: item.quantity,
        sell_price: item.sell_price,
      };

      for (let x = 0; x < this.tableItems.length; x++){
        if (this.tableItems[x].id === item.id){
          itemExist = true;
          itemIndex = x;
          
        }
      }


      if (itemExist){
        this.tableItems[itemIndex].count = this.tableItems[itemIndex].count + 1;
      }
      else {
        this.tableItems.push(newItem);
      }

      this.calcluteTotalPrice();
    }

    
  calcluteTotalPrice(){
    let totalPrice = 0;
    for (let x = 0; x < this.tableItems.length; x++){
      totalPrice += this.tableItems[x].sell_price * this.tableItems[x].count;
    }
    
    this.invoiceInfo.totalPrice = totalPrice;
  }

  loadInvoice(){
    this._httpInvoice.GetInvoice(this._reciptForm.value.id).subscribe(res => {
      this.tableItems = res['invoiceitems'];
      this.selectedItems = res['invoiceitems'];
      this._reciptForm.controls.id.setValue(res['id']);
      this.selectedCustomers = [res['customer']];
      this.invoiceInfo = {
        invoiceNumber: "",
        totalPrice: res['total_amount'],
        payed_amount: res['payed_amount'],
        date: new Date(res['created_at']),
      };

    },
    err => {
      this.openNewInvoice();
    }
    );
  }




  constructor(
    private dialogService: NbDialogService,
    private _httpInvoice : InvoiceService,
    private _httpItems : ItemService,
    private _httpCustomer: CustomerService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this._reciptForm = this.fb.group({
      id: new FormControl('', [
        Validators.required, 
        CustomValidators.number,
      ])
    });

  }


  getCustomerName(id){
    if (id === -1) {
      return "زبون";
    }
  }

  submit(){
    let sendObject : any = {};
    if (this._reciptForm.value.id === '') {
      //ADD New Invoice

      //by default pay all of the invoice
      if (this.invoiceInfo.payed_amount === -1) {
        sendObject.payed_amount = this.invoiceInfo.totalPrice;
      }

      if (this.selectedCustomers.length === 0) {
        sendObject.customer_id = -1;
      } else {
        sendObject.customer_id = this.selectedCustomers[0].id;
      }

      sendObject.total_amount = this.invoiceInfo.totalPrice;
      sendObject.items = [];
      for (let x = 0; x < this.tableItems.length; x++){
        sendObject.items[x] = {id: this.tableItems[x].id, count: this.tableItems[x].count};
      }

      this._httpInvoice.AddInvoice(sendObject).subscribe(res => {
        this.openNewInvoice();
      });
    }
    else {
      //Edit Envoice
    }
    
    

    
  }

  openNewInvoice(){
    this.selectedItems = [];
    this.tableItems = [];
    this.selectedCustomers = [];
    this._reciptForm.controls.id.setValue("");
    this.invoiceInfo = {
      invoiceNumber: "",
      totalPrice: 0,
      payed_amount: -1,
      date: new Date(),
    };
    this.dropdownList = [];
  }

  loadPrevInvoice(){
    this._httpInvoice.GetPrevInvoice(this._reciptForm.value.id).subscribe(res => {
      this.tableItems = res['invoiceitems'];
      this.selectedItems = res['invoiceitems'];
      this._reciptForm.controls.id.setValue(res['id']);
      this.selectedCustomers = [res['customer']];
      this.invoiceInfo = {
        invoiceNumber: "",
        totalPrice: res['total_amount'],
        payed_amount: res['payed_amount'],
        date: new Date(res['created_at']),
      };

    },
    err => {
      this.openNewInvoice();
    }
    );
  }

  loadNextInvoice(){
    this._httpInvoice.GetNextInvoice(this._reciptForm.value.id).subscribe(res => {
      this.tableItems = res['invoiceitems'];
      this.selectedItems = res['invoiceitems'];
      this.selectedCustomers = [res['customer']];
      this._reciptForm.controls.id.setValue(res['id']);
      this.invoiceInfo = {
        invoiceNumber: "",
        totalPrice: res['total_amount'],
        payed_amount: res['payed_amount'],
        date: new Date(res['created_at']),
      };

    },
    err => {
      this.openNewInvoice();
    }
    );
  }

}
