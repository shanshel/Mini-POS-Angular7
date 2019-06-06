import { CustomValidators } from 'ngx-custom-validators';
import { EmployeesService } from './../../../../core/services/http/employees/employees.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  _form: FormGroup;

  invalid: boolean = false;
  companies: any;

  constructor(
    private fb: FormBuilder,
    private _employees: EmployeesService,
    private router: Router,
    protected ref: NbDialogRef<EmployeeCreateComponent>

    ) {

   
   }

  ngOnInit() {
    this.buildFormRoles();
  }
  get form() {
    return this._form.controls;
  }


 private buildFormRoles(){
    this._form = this.fb.group({
      qiSmartId:  new FormControl(''),
      qiAccountNumber:  new FormControl(''),
      qiCardNumber:  new FormControl(''),
      publicEmployerId:  new FormControl('' ),
      govId:  new FormControl(''),
      govCardId:  new FormControl(''),
      govFamilyId:  new FormControl('' ),
      firstName:  new FormControl('', [Validators.required]),
      middleName:  new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      surName:  new FormControl('', ),
      birthDate:  new FormControl(''),
      address:  new FormControl(''),
      mobileNo:  new FormControl('', [CustomValidators.number,Validators.minLength(11)]),
      email:  new FormControl('', [CustomValidators.email]),
      gender:  new FormControl('0'),
      maritalStatus:  new FormControl('3'),
      fatherFullName:  new FormControl(''),
      motherFullName:  new FormControl(''),
    });
  }


  submit() {
    let submettedData = this._form.value;
    if (this._form.controls.birthDate.value === "") {
      delete submettedData['birthDate'];
    }
    if(this._form.controls.email.value === "") {
      delete submettedData['email'];
    }

    if(this._form.controls.email.value === "" && this._form.controls.birthDate.value === "") {
      delete submettedData['email'];
      delete submettedData['birthDate'];
    }


   
    this._employees.createEmployee(submettedData).subscribe(
      data => {
        this.dismiss();

      },
    );
  }
  dismiss(){
    this.ref.close();
  }
}
