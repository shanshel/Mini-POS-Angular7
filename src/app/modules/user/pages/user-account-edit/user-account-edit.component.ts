import { UsersService } from './../../../../core/services/http/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NbDialogRef } from '@nebular/theme';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

@Component({
  selector: 'ngx-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.scss']
})
export class UserAccountEditComponent implements OnInit {
  @Input() user : any;
  userId: string;
  userData: any;
  data: any;
  _form : FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _httpUsers : UsersService,
    private router: Router,
    protected ref: NbDialogRef<UserAccountEditComponent>

    ) {
      let password = new FormControl('');
      let repassword = new FormControl('', CustomValidators.equalTo(password));
      this._form = this.fb.group({
        email: new FormControl('', [Validators.required,Validators.email]),
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.minLength(11)]),
        password: password,
        repassword: repassword,
        id: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.userId = params.get('id');
      this._httpUsers.getUser(this.user.id).subscribe(res=> {
        this.userData = res['data'];
        this.setOldValues();
      });
    });
  }

  setOldValues() {
    this._form.controls.email.setValue(this.userData.email);
    this._form.controls.name.setValue(this.userData.name);
    this._form.controls.phone.setValue(this.userData.phone);
    this._form.controls.id.setValue(this.userData.id);
  }

  onSubmit(){
    let submittedData = this._form.value;

    if (this._form.controls.password.value === ""){
      delete submittedData['password'];
    }

    this._httpUsers.updateUser(submittedData).subscribe(res => {
      this.ref.close();
      this.router.navigate(['/users']);
    });
  }

  dismiss() {
    this.ref.close();
  }
}
