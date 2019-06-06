import { BankCreateComponent } from './../bank-create/bank-create.component';
import { JobTitleService } from './../../../../core/services/http/jobtitle/jobtitle.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';
import { BankService } from '../../../../core/services/http/bank/bank.service';
@Component({
  selector: 'ngx-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.scss']
})
export class BankViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  lastPageInfo;
  tableActions = [
    {
      label: getTranslate('edit') ,
      value: 'edit',
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
      this.dialogService.open(BankCreateComponent, {
        context: {
          item: item
        },
      }).onClose.subscribe(res => {
        this.renderBanks();
      });
    }
  }

  openCreateDialog(){
    this.dialogService.open(BankCreateComponent, {
      context: {},
    }).onClose.subscribe(res => {
      this.renderBanks();
    });
  }

}
