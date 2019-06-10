import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';
import { InvoiceService } from '../../../../core/services/http/invoice.service';
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
  ];

  items: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private _http : InvoiceService,
  ){}

  ngOnInit(): void {
    this.renderBanks();
  }

  renderBanks() {
    this._http.GetInvoices({}).subscribe(res =>{
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
