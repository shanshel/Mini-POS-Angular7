import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { ItemService } from '../../../../core/services/http/item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
@Component({
  selector: 'ngx-sell-view',
  templateUrl: './sell-view.component.html',
  styleUrls: ['./sell-view.component.scss']
})
export class SellViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: 'تعديل',
      value: 'edit',
      icon: 'nb-edit',
    }
  ];

  items: any[] = [];
  _form: FormGroup;

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
      
    onItemSelect(item:any){
      this.addItemToTable(item);
    }
    OnItemDeSelect(item:any){
      this.removeItemFromTable(item);
    }
    onSelectAll(items: any){
        console.log("test");
    }
    onDeSelectAll(items: any){
        console.log(items);
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
                if (res['data'].length == 1){
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
        if (this.tableItems[x].id == item.id){
          this.tableItems.splice(x, 1);
        }
      }
    }
    
    oddItemInTable(item) {
      for (let x = 0; x < this.tableItems.length; x++){
        if (this.tableItems[x].id == item.id){
          this.tableItems[x].count -= 1;
          if (this.tableItems[x].count < 1){
            this.removeItemFromTable(item);
          }
        }
      }
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
        if (this.tableItems[x].id == item.id){
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

      console.log(this.tableItems);
    }

    


  constructor(
    private dialogService: NbDialogService,
    private _httpItems : ItemService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.render();
  }

  render() {

  }
  onSubmit(){
    console.log(this._form);
  }


}
