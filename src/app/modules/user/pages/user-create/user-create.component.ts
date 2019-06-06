
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { UsersService } from './../../../../core/services/http/users/users.service';

@Component({
  selector: 'ngx-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  companies;
  _form: FormGroup;
  password: FormControl;
  repassword: FormControl;


  constructor(
    private fb: FormBuilder,
    private _httpUsers: UsersService,
    private router: Router,
    ) {
      this.password = new FormControl('', Validators.required);
      this.repassword = new FormControl('', CustomValidators.equalTo(this.password));

     }

  ngOnInit() {
    this.validate();
  }


  private validate() {
    this._form = this.fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: this.password,
      repassword: this.repassword,
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.minLength(11)]),
      role: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this._httpUsers.createUser(this._form.value).subscribe(res => {
      if (res['error'] === false) {
        this.router.navigate(['/users']);
      }
    });
  }

}
