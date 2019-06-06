import { EnrollmentsService } from './../../../../core/services/http/enrollments/enrollments.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-enrollment-create',
  templateUrl: './enrollment-create.component.html',
  styleUrls: ['./enrollment-create.component.scss']
})
export class EnrollmentCreateComponent implements OnInit, AfterViewInit {
  @Input() employee : any;
  @Input() jobTitles;
  @Input() departments;
  @Input() banks;
  @Input() editModeInfo;
  selectedJobTitle = null;
  selectedBankId = null;

  _form: FormGroup;
  roles: any[];


  constructor(
    private fb: FormBuilder,
    private _httpEnrollment: EnrollmentsService,
    private router: Router,
    protected ref: NbDialogRef<EnrollmentCreateComponent>
    ) {


  }

  ngOnInit() {
    this.buildFormRoles();
   
  }

  buildFormRoles (){
    if (this.editModeInfo) {
      this._form = this.fb.group({
        employeeId: new FormControl(this.employee.id, [Validators.required]),
        grade: new FormControl('', [Validators.required]),
        bankId: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        jobTitleId: new FormControl('', [Validators.required]),
        status: new FormControl(1, [Validators.required])
      });
      this.setOldValues();
    } else {
      this._form = this.fb.group({
        employeeId: new FormControl(this.employee.id, [Validators.required]),
        parentDupId: new FormControl('', []),
        departmentId:  new FormControl('', [Validators.required]),
        bankId: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        jobTitleId: new FormControl('', [Validators.required]),
        status: new FormControl(1, [Validators.required])
      });
    }
    this._form.controls.employeeId.setValue(this.employee.id);


  }

  setOldValues() {
    console.log(this.editModeInfo.bankId);
    this._form.controls.grade.setValue(this.editModeInfo.grade + 1);
    this._form.controls.level.setValue(this.editModeInfo.level);
    this._form.controls.bankId.setValue(this.editModeInfo.bankId);

  }

  onSubmit(){
    let submittedValues = this._form.value;
    delete submittedValues.parentDupId;
    submittedValues.grade = submittedValues.grade-1;
    if (!this.editModeInfo) {
      this._httpEnrollment.createEnrollment(submittedValues).subscribe(res => {
        this.ref.close();
      });
    } else {

      delete submittedValues.employeeId;
      submittedValues.id = this.editModeInfo.id;
      this._httpEnrollment.updateEnrollment(submittedValues).subscribe(res => {
        this.ref.close();
      });
    }
   
  }

  dismiss() {
    this.ref.close();
  }

  setSelectedJobTitleValue(jobTitleId){
    this._form.controls.jobTitleId.setValue(jobTitleId);
    this.selectedJobTitle = jobTitleId;
  }

  ngAfterViewInit(): void {
   
    this.selectedBankId = this.editModeInfo.bankId;
 
    
  }

}
