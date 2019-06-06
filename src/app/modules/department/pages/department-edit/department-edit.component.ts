import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { DepartmentsService } from '../../../../core/services/http/departments/departments.service';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  _form: FormGroup;
  @Input() department;
  departmentId: string;
  currentDepartment;
  departments;
  departmentName;
  @Input() parent;

  constructor(
      private dialogService: NbDialogService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpDepartments: DepartmentsService,
    private router: Router,
    protected ref: NbDialogRef<DepartmentEditComponent>

    ) {

  }


  ngOnInit() {
    
    this.departmentId = this.department.id;
    this.departmentName = this.department.name;
    this._httpDepartments.getDepartments(this.departmentId).subscribe(res => {
      this.currentDepartment = res['data'];
      this.setOldValues();
      
    });


    this.validate();

  }


  private validate() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      parentId: this.department.parentId
    });
  }

  setOldValues() {
    this._form.controls.name.setValue(this.departmentName);
    this._form.controls.id.setValue(this.department.id);
  }

  onSubmit() {
    this._httpDepartments.updateDepartment(this._form.value).subscribe(res => {
      this.ref.close();

    });
  }
  dismiss() {
    this.ref.close();
  }
}
