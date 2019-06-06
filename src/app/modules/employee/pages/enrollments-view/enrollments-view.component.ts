import { BankService } from './../../../../core/services/http/bank/bank.service';
import { JobTitleService } from './../../../../core/services/http/jobtitle/jobtitle.service';
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { EnrollmentsService } from './../../../../core/services/http/enrollments/enrollments.service';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EnrollmentCreateComponent } from '../enrollment-create/enrollment-create.component';
import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-enrollments-view',
  templateUrl: './enrollments-view.component.html',
  styleUrls: ['./enrollments-view.component.scss']
})
export class EnrollmentsViewComponent implements OnInit {
  @Input() employee;
  @Input() departments;
  @Input() viewMode : boolean = false;
  jobTitles;
  banks;
  isPaginationNextEmpty = false;
  tableActions = [
    {
      label: getTranslate('edit'),
      value: 'edit',
      icon: 'nb-edit',
    },
    {
      label: getTranslate('disable'),
      value: 'remove',
      icon: 'nb-trash',
    }
  ];
  enrollments;



  constructor(
    private dialogService: NbDialogService,
    private _httpEnrollments: EnrollmentsService,
    private _httpJobTitles : JobTitleService,
    private _httpBank : BankService,
    protected ref: NbDialogRef<EnrollmentsViewComponent>,
  

  ){}

  ngOnInit(): void {
    this.viewEmployeeEnrollments();

    if (!this.viewMode){
      this._httpJobTitles.getJobTitles({}).subscribe(res => {
        this.jobTitles = res['data'];
      });

      this._httpBank.getBanks({}).subscribe(res => {
        this.banks = res['data'];
      });
    }
  
    this.roleChanges();
    
  }

  roleChanges() {
    if (this.viewMode === true) {
      this.tableActions = [
      ];
    }
    
  }
  viewEmployeeEnrollments() {
    this._httpEnrollments.getEnrollments({employeeId: this.employee.id}).subscribe((data: any) => {
      this.isPaginationNextEmpty = false;
      this.enrollments = data.data;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  removeEnrollment(item) {

    this._httpEnrollments.updateEnrollment({
      id: item.id,
      status: 2,
    }).subscribe((data: any) => {
      this.viewEmployeeEnrollments();
    });
 
  }

  doAction(event, item) {
    if (event === 'edit') {
      this.dialogService.open(EnrollmentCreateComponent, {
        context: {
          employee: this.employee,
          departments: this.departments,
          banks: this.banks,
          editModeInfo: item,
          jobTitles: this.jobTitles,
        },
      }).onClose.subscribe(res => {
        this.viewEmployeeEnrollments();
      });
      
    }

    if (event === 'remove') {
        this.removeEnrollment(item);
    }
  }

  dismiss() {
    this.ref.close();
  }

  openCreatedialog() {
    this.dialogService.open(EnrollmentCreateComponent, {
      context: {
        employee: this.employee,
        departments: this.departments,
        banks: this.banks,
        jobTitles: this.jobTitles,
      },
    }).onClose.subscribe(res => {
      this.viewEmployeeEnrollments();
    });
  }
}
