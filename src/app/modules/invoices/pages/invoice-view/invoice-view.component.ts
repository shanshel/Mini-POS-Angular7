import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';
@Component({
  selector: 'ngx-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: 'تعديل',
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label: 'عرض الفواتير',
      value: 'view-invoice',
      icon: 'nb-edit',
    }
  ];

  banks: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private _httpBank : BankService,
  ){}

  ngOnInit(): void {
    this.renderBanks();
  }

  renderBanks() {
    this._httpBank.getBanks({}).subscribe(res =>{
        this.banks = res['data'];
        this.isPaginationNextEmpty = false;
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
    );
  }

  doAction(event, item) {
     if (event === 'edit') {
      this.dialogService.open(InvoiceCreateComponent, {
        context: {
          item: item
        },
      }).onClose.subscribe(res => {
        this.renderBanks();
      });
    }
  }

  openCreateDialog(){
    this.dialogService.open(InvoiceCreateComponent, {
      context: {},
    }).onClose.subscribe(res => {
      this.renderBanks();
    });
  }

}
