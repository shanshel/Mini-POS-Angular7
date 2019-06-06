import { MiscService } from './../../../core/services/http/misc/misc.service';
import { PaymentInfoComponent } from './dialog/payment-info/payment-info.component';
import { PaymentsService } from './../../../core/services/http/payments/payments.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrService } from '../../../shared/services/toastr.service';
import { ReusableDialogComponent } from '../../reusable/pages/reusable-view-page/reusable-dialog/reusable-dialog.component';
import { DatePipe, formatDate } from '@angular/common';
import { StartEndInterface } from '../../../core/interfaces/startEnd.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { DepartmentsService } from './../../../core/services/http/departments/departments.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../../../core/services/http/report/report.service';
import { AppTokenService } from '../../../shared/services/app-token.service';
import { environment } from '../../../../environments/environment';
import { ViewjsonfileComponent } from '../viewjsonfile/viewjsonfile.component';

@Component({
  selector: 'ngx-get-payments',
  templateUrl: './get-payments.component.html',
  styleUrls: ['./get-payments.component.scss']
})
export class GetPaymentsComponent implements OnInit {
  isPaginationNextEmpty = false;
  date: string;
  formpicker: string;
  departments;
  _form: FormGroup;
  _form2: FormGroup;
  services;
  @ViewChild('accitem') accordion;
  userPayments: any;
  lastThreePayments: any;
  searchType: string;
  filter_search: string;
  filter_search_type = "name";
  canDownloadReport = false;
  constructor(
    private dialogService: NbDialogService,
    private _toastrService: ToastrService,
    private _payments: PaymentsService,
    private datePipe: DatePipe,
    private _departments : DepartmentsService,
    private fb: FormBuilder,
    private _httpReport: ReportService,
    private _httpMisc: MiscService,
    private appToken: AppTokenService,
  ){}

  ngOnInit(): void {
    let role = this.appToken.getRole();
    if (role === environment.Role.Operator){
      this.canDownloadReport = true;
      this._httpMisc.getServices({start:0, end:10000}).subscribe(res => {
        this.services = res['data'];
      });
    }
    this.last3payments();
    this.getDepattment();
    this.buildFormRoles();  

  

    
  }

  pageInit(page) {
    
  }
  pageChange(page) {
    this.getPayments({start: page.start, end: page.end, name: this.filter_search});
  }

  last3payments() {
    this._payments.getLast3payments().subscribe((data: any) => {
      this.isPaginationNextEmpty = false;
      this.lastThreePayments = data.data;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  getDepattment(){
    this._departments.getMainDepartmentsWithSubDepts({start:0, end:100}).subscribe(res => {
      this.departments = res['data'];
    });
  }

  buildFormRoles(){

    this._form = this.fb.group({
      parentDupId: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', []),
    });

    this._form2 = this.fb.group({
      serviceId: new FormControl('', [Validators.required]),
    });
  }

  getSelectedServiceName(){
    for (let service of this.services) {
      if (service.id === this._form2.controls.serviceId.value) {
        return service.name;
      }
    }
    return "";
  }

  getSelectedDepName(){
    for (let department of this.departments) {
      if (department.id === this._form.controls.parentDupId.value && this._form.controls.departmentId.value === '') {
        return department.name;
      }
      for (let subdepartment of department.subDepartments) { 
        if (subdepartment.id === this._form.controls.departmentId.value) {
          return subdepartment.name;
        }
      }

    }
    return "";
  }
  
  downloadPdfDepartmentReport(){
    let submittedValues = this._form.value;

    if (submittedValues.departmentId === ''){
      submittedValues.departmentId = submittedValues.parentDupId;
    }
    submittedValues.date =  formatDate(this.date, 'yyyy/MM/dd', 'en');
    delete submittedValues.parentDupId;
    this._httpReport.getDepartmentDedectionsReport(submittedValues).subscribe(res =>{

      
      let blob = new Blob([res], { type: "application/pdf" } );
      const data = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = data;
      link.download = 'deduction'  + ' - ' + this.getSelectedDepName() + ' ' + submittedValues.date + ".pdf";
      link.setAttribute("target", '_blank');
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false, view: null }));




      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
    });
  }

  downloadDepartmentPdfReport(){
    let submittedValues = this._form.value;

    if (submittedValues.departmentId === '') {
      submittedValues.departmentId = submittedValues.parentDupId;
    }

    submittedValues.deptId = submittedValues.departmentId;
    submittedValues.date =  formatDate(this.date, 'yyyy/MM/dd', 'en');
    delete submittedValues.parentDupId;
    this._httpReport.downloadDepartmentPdfReport(submittedValues).subscribe(res =>{
      let blob = new Blob([res], { type: "application/pdf" } );
      const data = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = data;
      link.download = 'report'  + ' - ' + this.getSelectedDepName() + ' ' + submittedValues.date + ".pdf";
      link.setAttribute("target", '_blank');

      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false, view: null }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
    });
  }


  downloadPdfDedicationReport(){
    let submittedValues = this._form2.value;
    submittedValues.date =  formatDate(this.date, 'yyyy/MM/dd', 'en');
    this._httpReport.getDedectionReportForDepartments(submittedValues).subscribe(res =>{
      let blob = new Blob([res], { type: "application/pdf" } );
      const data = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = data;
      link.download = this.getSelectedServiceName() + " - " + submittedValues.date + ".pdf";
      link.setAttribute("target", '_blank');

      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: false, view: null }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
    });
  }




  getPayments(data) {
    if (data.name && this.filter_search_type === "name" && this.filter_search !== "") {
      data.name = this.filter_search;
      data.date = this.datePipe.transform(this.date, 'yyyy/MM/dd');

      this._payments.getEmployeesPaymentByName(data).subscribe((data: any) => {
        this.isPaginationNextEmpty = false;
        this.userPayments = data.data;
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
      );
    } else {
      let _date = this.datePipe.transform(this.date, 'yyyy/MM/dd');

      this._payments.getAllPayments(_date, {start: data.start, end: data.end}).subscribe((data: any) => {
       
        if (data){
          this.isPaginationNextEmpty = false;
          this.userPayments = data.data;
        } else {
          this.isPaginationNextEmpty = true;
        }
      },
      err => {
        this.isPaginationNextEmpty = true;
      }
      );
    }
  }




  openInfoDialog(item) {
    this.dialogService.open(PaymentInfoComponent, {
      context: {
        item,
      },
    });
  }


  updateSearchForEmployees(event = null) {
    if (event) {
      if (event.code === "Enter") {
        this.getPayments({start: 0, end: 10, name: this.filter_search});
      }
    } else {
      this.getPayments({start: 0, end: 10, name: this.filter_search});
    }
  }

  updateRootSearch(){
    this.getPayments({start: 0, end: 10});
  }

  viewJsonReport() {
    this._form.controls.parentDupId.value;
    this._form.controls.departmentId.value;
    this.dialogService.open(ViewjsonfileComponent, {
      context: {
        item: {
          departmentId: this._form.controls.departmentId.value, 
          parentDupId: this._form.controls.parentDupId.value 
        }
      },
    }).onClose.subscribe(res => {
    
    });
  }
}
