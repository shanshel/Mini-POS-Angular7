import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { DepartmentsService } from '../../../../core/services/http/departments/departments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})
export class DepartmentCreateComponent implements OnInit {
  _form: FormGroup;
  companies;
  departments;

  constructor(
    private fb: FormBuilder,
    private _httpDepartments: DepartmentsService,
    private router: Router,
    ) {

  }

  ngOnInit() {
   
    this.validate();

  }

  private validate() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(){
    let submittedValues = this._form.value;
    if (submittedValues.parentId === '') {
      delete submittedValues.parentId;
    }
    this._httpDepartments.createDepartment(submittedValues).subscribe(res => {
      if (res['error'] === false) {
        this.router.navigate(['/departments']);
      }
    });

  }


}
