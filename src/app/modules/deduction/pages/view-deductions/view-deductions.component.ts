import { AddDeductionComponent } from './../../dialog/add-deduction/add-deduction.component';
import { StartEndInterface } from './../../../../core/interfaces/startEnd.interface';
import { Component, OnInit } from '@angular/core';
import { DeductionsService } from '../../../../core/services/http/deduction/deductions.service';
import { NbDialogService } from '@nebular/theme';
import { EditDeductionComponent } from '../../dialog/edit-deduction/edit-deduction.component';
import { getTranslate } from '../../../../lang';
@Component({
  selector: 'ngx-view-deductions',
  templateUrl: './view-deductions.component.html',
  styleUrls: ['./view-deductions.component.scss']
})
export class ViewDeductionsComponent implements OnInit {
  isPaginationNextEmpty = false;
  deductions: any[] = [];
  tableActions = [
    {
      label: getTranslate('edit') ,
      value: 'edit',
      icon: 'nb-edit',
    },
  ];

  constructor(private _deduction: DeductionsService, private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  pageInit(page) {
    this.getDeductions();
  }

  pageChange(page: any) {
    this.getDeductions({start: page.start, end: page.end});
  }

  openAddDialog() {
    this.dialogService.open(AddDeductionComponent).onClose.subscribe((res: any) => {
      this.getDeductions();
    });
  }

  doAction(action: string, item: any) {
    console.log(action, item);
    if(action === 'edit') {
      this.dialogService.open(EditDeductionComponent, {
        context: {
            item: item,
        }
      }).onClose.subscribe((res: any) => {
        this.getDeductions();
      });
    }
  }


  getDeductions(startEnd: StartEndInterface = {start: 0, end: 10}) {
    this._deduction.getAllDeductions(startEnd).subscribe((data: any) => {
      this.deductions = data.data;
      this.isPaginationNextEmpty = false;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }
}
