import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../core/services/http/employees/employees.service';
import { NbDialogRef } from '@nebular/theme';
import { CustomValidators } from 'ngx-custom-validators';


@Component({
  selector: 'ngx-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @Input() employee;
  _form: FormGroup;
  invalid: boolean = false;
  companies: any;
  currentEmployee;

  constructor(
    private fb: FormBuilder,
    private _employees: EmployeesService,
    protected ref: NbDialogRef<EmployeeEditComponent>

    ) {}

  ngOnInit() {
    this.buildFormRoles();

    
    this._employees.getEmployee(this.employee.id).subscribe(res => {
      this.currentEmployee = res['data'];
      this.setOldValues();
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
    this._form.controls.birthDate.setValue(this.currentEmployee.birthDate);
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
      id: new FormControl(''),
      qiSmartId:  new FormControl(''),
      qiAccountNumber:  new FormControl(''),
      qiCardNumber:  new FormControl(''),
      publicEmployerId:  new FormControl(''),
      govId:  new FormControl(''),
      govCardId:  new FormControl(''),
      govFamilyId:  new FormControl(''),
      firstName:  new FormControl('', [Validators.required]),
      middleName:  new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      surName:  new FormControl(''),
      birthDate:  new FormControl(''),
      address:  new FormControl(''),
      mobileNo:  new FormControl('',[CustomValidators.number,Validators.minLength(11)]),
      email:  new FormControl('', [CustomValidators.email]),
      gender:  new FormControl(''),
      maritalStatus:  new FormControl(''),
      fatherFullName:  new FormControl(''),
      motherFullName:  new FormControl(''),
    });
  }

  get form() {
    return this._form.controls;
  }



  submit() {
    this._employees.updateEmployee(this._form.value).subscribe((data: any) => {
    });
  }

  dismiss() {
    this.ref.close();
  }
}
