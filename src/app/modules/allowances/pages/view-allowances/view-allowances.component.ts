import { DialogEditAllowancesComponent } from './../../dialog/edit-allowances/edit-allowances.component';
import { DialogAddAllowancesComponent } from './../../dialog/add-allowances/add-allowances.component';
import { StartEndInterface } from './../../../../core/interfaces/startEnd.interface';
import { AllowancesService } from './../../../../core/services/http/allowance/allowances.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme/components/dialog/dialog.service';

import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-view-allowances',
  templateUrl: './view-allowances.component.html',
  styleUrls: ['./view-allowances.component.scss']
})
export class ViewAllowancesComponent implements OnInit {
  isPaginationNextEmpty = false;
  allowances: any[] = [];
  tableActions = [
    {
      label :getTranslate('edit') ,
      value: 'edit',
      icon: 'nb-edit',
    },
  ];
  constructor(private allowances$: AllowancesService,
              private dialogService: NbDialogService) { }

  ngOnInit() {
  }


  pageInit(page) {
    this.getAllAllowances();
  }

  pageChange(page) {
    this.getAllAllowances({start: page.start, end: page.end});
  }

  getAllAllowances(startEnd: StartEndInterface = {start: 0, end: 10}) {
    this.allowances$.getAllAllownaces(startEnd).subscribe((data: any) => {
      this.allowances = data.data;
      this.isPaginationNextEmpty = false;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  openAddDialog() {
    this.dialogService.open(DialogAddAllowancesComponent).onClose.subscribe((res: any) => {
      this.getAllAllowances();
    });
  }

  doAction(action: string, item: any) {
    console.log(action, item);
    if(action === 'edit') {
      this.dialogService.open(DialogEditAllowancesComponent, {
        context: {
            item: item,
        }
      }).onClose.subscribe((res: any) => {
        this.getAllAllowances();
      });
    }
  }

 
}
