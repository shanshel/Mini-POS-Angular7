import { ToastrService } from './../../../../shared/services/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ReusableDialogComponent } from './reusable-dialog/reusable-dialog.component';

@Component({
  selector: 'ngx-reusable-view-page',
  templateUrl: './reusable-view-page.component.html',
  styleUrls: ['./reusable-view-page.component.scss']
})
export class ReusableViewPageComponent implements OnInit {
  isPaginationNextEmpty = false;
  @ViewChild('accitem') accordion;
  tableActions = [
    {
      label: 'تعديل',
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label: 'حذف',
      value: 'remove',
      icon: 'nb-trash',
    },
    {
      label: 'دايلوك',
      value: 'dialog',
      icon: 'nb-tables',
    },
  ];

  ministries: any[] = [
    {
      name: 'الوزارة 22',
      code: '201',
    },
    {
      name: 'الوزارة 22',
      code: '201',
    },
    {
      name: 'الوزارة 33',
      code: '201',
    }
  ];


  constructor(
    private dialogService: NbDialogService,
    private _toastrService: ToastrService
  ){}

  ngOnInit(): void {
    // reuse this for showing alerts




  }

  pageInit(page) {

  }
  pageChange(page) {

  }

  doAction(event, item) {
    if (event === 'dialog') {
      this.dialogService.open(ReusableDialogComponent, {
        context: {
          item,
        },
      });
    }
  }

  columnSort = {
    0: { name: 'name', displayName: 'Username' },
    1: { name: 'age', displayName: 'Age' },
    2: { name: 'number', displayName: 'Number' },
  };

  tableData = [
    {name: 'yousif', age: 22, number: '#3339'}
  ];


}
