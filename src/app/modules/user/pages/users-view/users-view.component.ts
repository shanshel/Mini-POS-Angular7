import { ToastrService } from './../../../../shared/services/toastr.service';
import { UserAccountEditComponent } from './../user-account-edit/user-account-edit.component';
import { UsersService } from './../../../../core/services/http/users/users.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { EnrollmentCreateComponent } from '../enrollment-create/enrollment-create.component';
import { environment } from '../../../../../environments/environment';
import { TranslateDirective } from '../../../../translate.directive';

import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  isPaginationNextEmpty = false;
  tableActions = [
   
    {
      label: getTranslate('edit') ,
      value: 'edit-profile',
      icon: 'nb-edit',
    },
    {
      label: getTranslate('Placement'),
      value: 'enroll',
      icon: 'nb-edit',
    },
  ];

  users: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private _httpUsers: UsersService,
    private _toastr: ToastrService
  ){}

  ngOnInit(): void {
    
  }

  pageInit(pageObject) {
    this._httpUsers.getUsers({start: pageObject.start, end: pageObject.end}).subscribe(res =>{
      this.users = res['data'];
      
    });
  }

  pageChange(pageObject) {
    this._httpUsers.getUsers({start: pageObject.start, end: pageObject.end}).subscribe(res =>{
      this.users = res['data'];
      this.isPaginationNextEmpty = false;
    }, 
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  doAction(event, item) {
    if (item.role === environment.Role.Admin) {
      this._toastr.showToast('تنبيه!', 'لا يمكن تعديل الادمن', {});
      return;
    }
    if (event === 'enroll') {
      this.dialogService.open(EnrollmentCreateComponent, {
        context: {
          user: item,
        },
      });
      
      //this.router.navigate([`users/${item.id}/accountedit`]);
    } else if (event === 'edit-profile') {
      this.dialogService.open(UserAccountEditComponent, {
        context: {
          user: item,
        },
      }).onClose.subscribe(res=> {

        this._httpUsers.getUsers({start: 0, end: 10}).subscribe(res =>{
          this.users = res['data'];
        });
      });
      
    }
  }

}
