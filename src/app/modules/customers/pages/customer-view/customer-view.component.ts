import { CustomerService } from './../../../../core/services/http/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { PayloanComponent } from '../../components/payloan/payloan-create.component';
@Component({
  selector: 'ngx-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: 'تعديل',
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label: 'تسديد دين',
      value: 'pay',
      icon: 'nb-edit',
    },
    {
      label: 'عرض الفواتير',
      value: 'view-invoice',
      icon: 'nb-edit',
    }
  ];

  items: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private _httpBank : CustomerService,
  ){}

  ngOnInit(): void {
    this.render();
  }

  render() {
    this._httpBank.getCustomers({}).subscribe(res =>{
        this.items = res['data'];
        this.isPaginationNextEmpty = false;
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
    );
  }

  doAction(event, item) {
     if (event === 'edit') {
      this.dialogService.open(CustomerCreateComponent, {
        context: {
          item: item
        },
      }).onClose.subscribe(res => {
        this.render();
      });
    }
    else if (event === "pay") {
      this.dialogService.open(PayloanComponent, {
        context: {
          customer: item
        },
      }).onClose.subscribe(res => {
        this.render();
      });
    }
  }

  openCreateDialog(){
    this.dialogService.open(CustomerCreateComponent, {
      context: {},
    }).onClose.subscribe(res => {
      this.render();
    });
  }

}
