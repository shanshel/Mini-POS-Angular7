import { UsersService } from './../../../../core/services/http/users/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-enrollment-create',
  templateUrl: './enrollment-create.component.html',
  styleUrls: ['./enrollment-create.component.scss']
})
export class EnrollmentCreateComponent implements OnInit {
  @Input() user : any;
  departments;

  _form: FormGroup;



  constructor(
    private fb: FormBuilder,
    private _httpUser: UsersService,
    private router: Router,
    protected ref: NbDialogRef<EnrollmentCreateComponent>
    ) {


  }

  ngOnInit() {
    this.buildFormRoles();
    this._form.controls.userId.setValue(this.user.id);
    this._httpUser.GetDepartments(0 , 100 ).subscribe(res => {
      this.departments = res['data'];
    
    });
  }

  buildFormRoles (){
    this._form = this.fb.group({
      userId: new FormControl(this.user.id, [Validators.required]),
      departmentId:  new FormControl('', [Validators.required]),
      parentDupId: new FormControl (' ', [Validators.required]),
      
    });
  }


  onSubmit(){
    if (this._form.value.departmentId === "")
    {

      this._form.controls.departmentId.setValue(this._form.value.parentDupId);
   
    this._httpUser.AttatchDepartmentToUser(this._form.value).subscribe(res=>{
      this.ref.close();

    });
  }
  else

{
  this._httpUser.AttatchDepartmentToUser(this._form.value).subscribe(res=>{
    this.ref.close();

  });
}
   
  }

  dismiss() {
    this.ref.close();
  }

  onChange(){
    console.log();
  }
}
