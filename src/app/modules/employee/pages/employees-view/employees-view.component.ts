import { EmployeeCreateComponent } from './../employee-create/employee-create.component';
import { ToastrService } from './../../../../shared/services/toastr.service';
import { DialogConfirmationComponent } from './../../../../shared/components/dialog-confirmation/dialog-confirmation.component';
import { AppTokenService } from './../../../../shared/services/app-token.service';
import { DepartmentsService } from './../../../../core/services/http/departments/departments.service';
import { EmployeesService } from './../../../../core/services/http/employees/employees.service';
import { NbDialogService, NbToastrService, NbGlobalPositionStrategy, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EnrollmentsViewComponent } from '../enrollments-view/enrollments-view.component';
import { environment } from '../../../../../environments/environment';
import { EmployeeViewOneComponent } from '../employee-view-one/employee-view-one.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements OnInit {
  @ViewChild('accitem') accordion;
  filter_search = "";
  filter_search_type = "name";
  isPaginationNextEmpty = false;
  viewMode = false;
  page;
  tableActions = [
    {
      label: getTranslate('edit') ,
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label: getTranslate('view_placement'),
      value: 'view-enrollments',
      icon: 'nb-tables',
    },
    {
      label: getTranslate('delete'),
      value: 'remove',
      icon: 'nb-trash',
    },
  ];

  employees: any[] = [];
  departments: any;
  constructor(
    private dialogService: NbDialogService,
    private _users: EmployeesService,
    private _departments : DepartmentsService,
    private _appToken: AppTokenService,
    private _toastr: ToastrService,
    private toastrService: NbToastrService
  ){}

  ngOnInit() {


    this.roleChanges();

  }

  roleChanges() {
    let role = this._appToken.getRole();
    if (role === environment.Role.Accountant) {
      this.viewMode = true;
      this.tableActions = [
        {
          label: getTranslate('view_placement'),
          value: 'view-enrollments',
          icon: 'nb-tables',
        },
        {
          label: getTranslate('view_info') ,
          value: 'viewone',
          icon: 'nb-tables',
        },
        
      ];
    } else {
      this._departments.getMainDepartmentsWithSubDepts({start:0, end:100}).subscribe(res => {
        this.departments = res['data'];
      });
    }
  
  }

  pageInit(page) {
    this.page = page;
    this.getEmployees({start: page.start, end: page.end, name: this.filter_search});
  }
  
  pageChange(page) {
    this.page = page;
    this.getEmployees({ start: page.start, end: page.end, name: this.filter_search});
  }


  filterFormSubmit() {
    this.getEmployees({ start: this.page.start, end: this.page.end, name: this.filter_search});
  }

  getEmployees(data) {
    if (this.filter_search_type === "name" && this.filter_search !== ""){
      data.name = this.filter_search;
      this._users.getEmployeesByName(data).subscribe((data: any) => {
        this.employees = data.data;
        this.isPaginationNextEmpty = false;
      },
      (err: any) => {
        this.isPaginationNextEmpty = true;
      }
      );
    }
    else if (this.filter_search_type === "qismart" && this.filter_search !== "") {

      this._users.getEmployeeByQiSmartId({qiSmartId: this.filter_search}).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
          
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "qinumber" && this.filter_search !== "") {
      data.qiAccountNumber = this.filter_search;
      this._users.getEmployeeByQiAccountNumber(data).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "qicard" && this.filter_search !== "") {
      data.qiCardNumber = this.filter_search;
      this._users.getEmployeeByQiCardNumber(data).subscribe(
        (data: any) => {
         
          this.employees = [data.data];
         
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "eid" && this.filter_search !== "") {
      data.publicEmployerId = this.filter_search;
      this._users.getEmployeeByPublicEmployerId(data).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
       
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "idN" && this.filter_search !== "") {
      data.govId = this.filter_search;
      this._users.getEmployeeByGovId(data).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "idP" && this.filter_search !== "") {
      data.govCardId = this.filter_search;
      this._users.getEmployeeByGovCardId(data).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else if (this.filter_search_type === "idF" && this.filter_search !== "") {
      data.govFamilyId = this.filter_search;
      this._users.getEmployeeByGovFamilyId(data).subscribe(
        (data: any) => {
          if (Array.isArray(data.data)) {
            this.employees = data.data;
          } else {
            this.employees = [data.data];
          }
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
    else {
      this._users.getEmployees(data).subscribe(
        (data: any) => {
          this.employees = data.data;
          this.isPaginationNextEmpty = false;
        },
        (err: any) => {
          this.isPaginationNextEmpty = true;
        }
      );
    }
  }

  doAction(event: any, item: any) {
    if (event === 'view-enrollments') {
      this.dialogService.open(EnrollmentsViewComponent, {
        context: {
          employee: item,
          departments: this.departments,
          viewMode: this.viewMode,
        },
      });
    }
    else if (event === 'edit') {
      this.dialogService.open(EmployeeEditComponent, {
        context: {
          employee: item,
        },
      });
    }
    else if (event === 'viewone') {
      this.dialogService.open(EmployeeViewOneComponent, {
        context: {
          employee: item,
        },
      });
    }
    else if (event === 'remove') {
      this.dialogService.open(DialogConfirmationComponent, {
        context: {
          item: item,
        },
      }).onClose.subscribe((boolConfDelete) => {
        if (boolConfDelete) {
          //send delete request here
        }
      });
    }
  }

  openCreateEmployee() {
    this.dialogService.open(EmployeeCreateComponent, {
      context: {},
    }).onClose.subscribe(res=>{
      this.getEmployees({ start: this.page.start, end: this.page.end, name: this.filter_search});
    });
  }
}
