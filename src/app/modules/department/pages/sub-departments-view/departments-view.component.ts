import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ReusableDialogComponent } from '../../../reusable/pages/reusable-view-page/reusable-dialog/reusable-dialog.component';
import { ActivatedRoute  } from '@angular/router';
import { DepartmentsService } from '../../../../core/services/http/departments/departments.service';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { getTranslate } from '../../../../lang';
@Component({
  selector: 'ngx-departments-view',
  templateUrl: './departments-view.component.html',
  styleUrls: ['./departments-view.component.scss']
})
export class SubDepartmentsViewComponent implements OnInit {
  _form: FormGroup;
  isPaginationNextEmpty = false;
  tableActions = [
    {
      label:getTranslate('edit'),
      value: 'edit',
      icon: 'nb-edit',
    },
  ];
  departments;
  parentDeptInfo;
  parentid;



  constructor(
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private _httpDepartments: DepartmentsService,
    private fb: FormBuilder,
  ){}

  ngOnInit(){

    this.route.queryParams.subscribe(params=>{
      this.parentDeptInfo = params;
      this.validate();

      
      
    });
    this.getSubDept();
  }

  private validate() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required,Validators.minLength(2)]),
      parentId: this.parentDeptInfo.id

    });
  }

  pageInit(page) {
    
  }
  pageChange(pageObject) {
    this._httpDepartments.getDepartments({start: pageObject.start, end: pageObject.end}).subscribe(res => {
      this.departments = res['data'];
      this.isPaginationNextEmpty = false;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }
  getSubDept(){
    this._httpDepartments.getSubDepartment(this.parentDeptInfo.id).subscribe(res => {
      this.departments = res['data'];
      this.isPaginationNextEmpty = false;
    },
    err => {
      this.isPaginationNextEmpty = true;
    }
    );
  }

  addSubDept(){
    console.log(this._form),
    this._httpDepartments.createDepartment(this._form.value).subscribe(res=>{
      this.getSubDept();
    });
  }
  doAction(event, item) {
    if (event === 'edit') {
      this.dialogService.open(DepartmentEditComponent, {
        context: {
          department: item,
        },
      }).onClose.subscribe(res => {
        
        setTimeout(() => {
            
          this.getSubDept();
            
          
        }, 200);
        
      });
     
    }
    
  }

}
