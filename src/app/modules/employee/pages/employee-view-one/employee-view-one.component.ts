import { MiscService } from './../../../../core/services/http/misc/misc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../core/services/http/employees/employees.service';
import { NbDialogRef } from '@nebular/theme';
import {DialogConfirmationComponent} from '../dialog-confirmation/dialog-confirmation.component';
import { NbDialogService } from '@nebular/theme';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'ngx-employee-viewone',
  templateUrl: './employee-view-one.component.html',
  styleUrls: ['./employee-view-one.component.scss']
})
export class EmployeeViewOneComponent implements OnInit {

  @Input() employee;
  _form: FormGroup;
  _deductionForm: FormGroup;
  _allowanceForm: FormGroup;
  _absentForm:FormGroup;
  invalid: boolean = false;
  companies: any;
  currentEmployee;
  dedc;
  absenceMessage = "";

  __getBasicSalaryAsync;
  __getEmployeeAllowances;
  __getEmployeeDeductions;
  __getTotalSalaryAsync;
  __getnetSalaryAsync;
  __getAllowanceTypes;
  __getServices;
  
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private _employees: EmployeesService,
    private _misc : MiscService,
    protected ref: NbDialogRef<EmployeeViewOneComponent>,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.buildFormRoles();

    
    this._employees.getEmployee(this.employee.id).subscribe(res => {
      this.currentEmployee = res['data'];
      this.setOldValues();
    });

    this._employees.getBasicSalaryAsync({employeeId: this.employee.id}).subscribe(res=>{
      this.__getBasicSalaryAsync = res['data'];
    });



    this.renderAllowances();
    this.renderDeductions();
    this._employees.getTotalSalaryAsync({employeeId: this.employee.id}).subscribe(res=>{
      this.__getTotalSalaryAsync = res['data'];
    });
    this._employees.getnetSalaryAsync({employeeId: this.employee.id}).subscribe(res=>{
      this.__getnetSalaryAsync = res['data'];
    });

    this._misc.getServices({start:0, end: 100}).subscribe(res=>{
      this.__getServices = res['data'];

    });

    this._misc.getAllowanceTypes({start:0, end: 100}).subscribe(res=>{
      this.__getAllowanceTypes = res['data'];
      console.log(this.__getAllowanceTypes);
    });


  }

  renderDeductions(){
    this._employees.getEmployeeDeductions({employeeId: this.employee.id}).subscribe(res=>{
      this.__getEmployeeDeductions = res['data'];
    });
  }

  renderAllowances(){
    this._employees.getEmployeeAllowances({employeeId: this.employee.id}).subscribe(res=>{
      this.__getEmployeeAllowances = res['data'];
    });
  }

  setOldValues() {
    this._form.controls.id.setValue(this.employee.id);
    this._form.controls.qiSmartId.setValue(this.currentEmployee.qiSmartId);
    this._form.controls.qiAccountNumber.setValue(this.currentEmployee.qiAccountNumber);
    this._form.controls.qiCardNumber.setValue(this.currentEmployee.qiCardNumber);
    this._form.controls.publicEmployerId.setValue(this.currentEmployee.publicEmployerId);
    this._form.controls.govId.setValue(this.currentEmployee.govId);
    this._form.controls.govCardId.setValue(this.currentEmployee.govCardId);
    this._form.controls.govFamilyId.setValue(this.currentEmployee.govFamilyId);
    this._form.controls.firstName.setValue(this.currentEmployee.firstName);
    this._form.controls.middleName.setValue(this.currentEmployee.middleName);
    this._form.controls.lastName.setValue(this.currentEmployee.lastName);
    this._form.controls.surName.setValue(this.currentEmployee.surName);
    this._form.controls.birthDate.setValue(new Date(this.currentEmployee.birthDate));
    this._form.controls.address.setValue(this.currentEmployee.address);
    this._form.controls.mobileNo.setValue(this.currentEmployee.mobileNo);
    this._form.controls.email.setValue(this.currentEmployee.email);
    this._form.controls.gender.setValue(this.currentEmployee.gender);
    this._form.controls.maritalStatus.setValue(this.currentEmployee.maritalStatus);
    this._form.controls.fatherFullName.setValue(this.currentEmployee.fatherFullName);
    this._form.controls.motherFullName.setValue(this.currentEmployee.motherFullName);
  }


  buildFormRoles(){
    this._form = this.fb.group({
      id: new FormControl('', [Validators.required]),
      qiSmartId:  new FormControl('', [Validators.required]),
      qiAccountNumber:  new FormControl('', [Validators.required]),
      qiCardNumber:  new FormControl('', [Validators.required]),
      publicEmployerId:  new FormControl('', [Validators.required]),
      govId:  new FormControl('', [Validators.required]),
      govCardId:  new FormControl('', [Validators.required]),
      govFamilyId:  new FormControl('', [Validators.required]),
      firstName:  new FormControl('', [Validators.required]),
      middleName:  new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      surName:  new FormControl('', [Validators.required]),
      birthDate:  new FormControl('', [Validators.required]),
      address:  new FormControl('', [Validators.required]),
      mobileNo:  new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required]),
      gender:  new FormControl('', [Validators.required]),
      maritalStatus:  new FormControl('', [Validators.required]),
      fatherFullName:  new FormControl('', [Validators.required]),
      motherFullName:  new FormControl('', [Validators.required]),
    });

    this._deductionForm = this.fb.group({
      employeeId: new FormControl(this.employee.id, [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date:  new FormControl('', [Validators.required]),
      serviceId:  new FormControl('', [Validators.required]),
      isPermanent:  new FormControl(false, [Validators.required]),
      file: new FormControl(null)
    });

    this._allowanceForm = this.fb.group({
      employeeId: new FormControl(this.employee.id, [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date:  new FormControl('', [Validators.required]),
      allowanceTypeId:  new FormControl('', [Validators.required]),
      isPermanent:  new FormControl(false, [Validators.required]),
      file: new FormControl(null)
    });
    //  start _absentForm
    this._absentForm = this.fb.group({
      employeeId: new FormControl(this.employee.id, [Validators.required]),
      numberOfDays: new FormControl('', [Validators.required])
    });
    // end _absentForm
  }

  

  get form() {
    return this._form.controls;
  }

  selectedServiceObject;
  dedicationSelectChange(dedicationID) {
    for (let dedicationService of this.__getServices) {
      if (dedicationID === dedicationService.id) {
        this.selectedServiceObject = dedicationService;
        if (dedicationService.type === 2) {
          this._deductionForm = this.fb.group({
            employeeId: new FormControl(this.employee.id, [Validators.required]),
            amount: new FormControl('', [Validators.required, CustomValidators.range([0, 300])]),
            date:  new FormControl('', [Validators.required]),
            serviceId:  new FormControl(dedicationID, [Validators.required]),
            isPermanent:  new FormControl(false, [Validators.required]),
            file: new FormControl(null)
          });
        } else {
          this._deductionForm = this.fb.group({
            employeeId: new FormControl(this.employee.id, [Validators.required]),
            amount: new FormControl('', [Validators.required]),
            date:  new FormControl('', [Validators.required]),
            serviceId:  new FormControl(dedicationID, [Validators.required]),
            isPermanent:  new FormControl(false, [Validators.required]),
            file: new FormControl(null)
          });
        }
      }
    }
  }

  selectedAllowanceObject;
  allowanceSelectChange(allowanceID) {
    for (let allowance of this.__getAllowanceTypes) {
      if (allowanceID === allowance.id) {
        this.selectedAllowanceObject = allowance;
        console.log(allowance);
        if (allowance.type === 2) {
          this._allowanceForm = this.fb.group({
            employeeId: new FormControl(this.employee.id, [Validators.required]),
            amount: new FormControl('', [Validators.required, CustomValidators.range([0, 300]) ]),
            date:  new FormControl('', [Validators.required]),
            allowanceTypeId:  new FormControl(allowanceID, [Validators.required]),
            isPermanent:  new FormControl(false, [Validators.required]),
            file: new FormControl(null)
          });
        } else {
          this._allowanceForm = this.fb.group({
            employeeId: new FormControl(this.employee.id, [Validators.required]),
            amount: new FormControl('', [Validators.required]),
            date:  new FormControl('', [Validators.required]),
            allowanceTypeId:  new FormControl(allowanceID, [Validators.required]),
            isPermanent:  new FormControl(false, [Validators.required]),
            file: new FormControl(null)
          });
        }
      }
    }
  }




  allowancePermenentClick(){
    
    if ( this._allowanceForm.controls.isPermanent ) {
      this._allowanceForm.controls.date.setValue(new Date('December 17, 9999 03:24:00'));
    }
  }

  dedicationPermenentClick(){
    if ( this._deductionForm.controls.isPermanent ) {
      this._deductionForm.controls.date.setValue(new Date('December 17, 9999 03:24:00'));
    }
  }


  submit() {
    this._employees.updateEmployee(this._form.value).subscribe((data: any) => {
    });
  }

  deleteDeducation(item) {
    this.dialogService.open(DialogConfirmationComponent, {
      context: {
        dedc: item,
      },
    }).onClose.subscribe(res => {
      if (res){
        this._employees.deleteEmployeeDeduction({dedectId: item.id}).subscribe(res=>{
          this.renderDeductions();
        });
      }
    });
  }
  test(formData){
    console.log(formData);
  }

  onDedicationFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this._deductionForm.get('file').setValue(file);
    }
  }

  onAllowanceFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this._allowanceForm.get('file').setValue(file);
    }
  }

  createDeducation(){
    const formData = new FormData();
    let submitted = this._deductionForm.value;
    Object.entries(this._deductionForm.value).forEach(
      ([key, value]: any[]) => {
          if (key === 'file') {
            formData.set(key, value);
          }
      
      }
    );
    delete submitted['file'];

    // if file set upload it..
    if (this._deductionForm.controls.file.value) {
      this._employees.uploadFile(formData).subscribe(res => {
        submitted.fileId = res['data'];
        this._employees.addDeduction(submitted).subscribe(res=>{
          this.renderDeductions();
        });
      });
    } else {
      this._employees.addDeduction(submitted).subscribe(res=>{
        this.renderDeductions();
      });
    }

    /*
   
    */
  }

  deleteAllowance(item) {
    this.dialogService.open(DialogConfirmationComponent, {
      context: {
        dedc: item,
      },
    }).onClose.subscribe(res => {
      if (res){
        this._employees.deleteEmployeeAllowance({allowanceId: item.id}).subscribe(res=>{
          this.renderAllowances();
        });
      }
    });
    
    
  }
  createAllowance() {
    const formData = new FormData();
    let submitted = this._allowanceForm.value;

    Object.entries(this._allowanceForm.value).forEach(
      ([key, value]: any[]) => {
        if (key === 'file') {
          formData.set(key, value);
        }
      }
    );
    delete submitted['file'];
    if (this._allowanceForm.controls.file.value){
      this._employees.uploadFile(formData).subscribe(res => {
        submitted.fileId = res['data'];
        this._employees.addEmployeeAllowance(submitted).subscribe(res=>{
          this.renderAllowances();
        });
      });
    } else {
      this._employees.addEmployeeAllowance(submitted).subscribe(res=>{
        this.renderAllowances();
      });
    }


  }
  dismiss() {
    this.ref.close();
  }

  getAbsence() {
    this._misc.getAbsenceAmount(this._absentForm.value).subscribe(res=>{
      this.absenceMessage = res["data"];
    });
  }
  
}
