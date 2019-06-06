import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ReusableDialogComponent } from '../../../reusable/pages/reusable-view-page/reusable-dialog/reusable-dialog.component';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../../../core/services/http/departments/departments.service';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';

import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-departments-view',
  templateUrl: './departments-view.component.html',
  styleUrls: ['./departments-view.component.scss']
})
export class DepartmentsViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  tableActions = [
    {
      label:getTranslate('edit'),
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label:getTranslate('view_add_sub_circle'),
      value: 'add',
      icon: 'nb-edit',
    }
  ];
  departments;
 




  constructor(
    private dialogService: NbDialogService,
    private _router: Router,
    private _httpDepartments: DepartmentsService,
  ){}

  ngOnInit(): void {
    console.log("hey bro");

  }

  pageInit(pageObject) {
    this._httpDepartments.getDepartments({start: pageObject.start, end: pageObject.end}).subscribe(
      res => {
        this.departments = res['data'];
        this.isPaginationNextEmpty = false;
      },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }
  pageChange(pageObject) {
    this._httpDepartments.getDepartments({start: pageObject.start, end: pageObject.end}).subscribe(res => {
      this.departments = res['data'];
      this.isPaginationNextEmpty = false;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  doAction(event, item) {
    if (event === 'edit') {
      this.dialogService.open(DepartmentEditComponent, {
        context: {
          department: item,
        },
      }).onClose.subscribe(res => {
        
        setTimeout(() => {
            
          {
            this._httpDepartments.getDepartments({start: 0, end: 10}).subscribe(res => {
              this.departments = res['data'];
              this.isPaginationNextEmpty = false;
            },
            err => {
              this.isPaginationNextEmpty = true;
            }
            );
          }
        }, 200);
        
      });
     
    }
    else{
      this._router.navigate(['/departments/sub-depts'], { queryParams:item});
    }
    
  }

}
