import { JobTitleService } from './../../../../core/services/http/jobtitle/jobtitle.service';

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { UsersService } from './../../../../core/services/http/users/users.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-jobtitle-create',
  templateUrl: './jobtitle-create.component.html',
  styleUrls: ['./jobtitle-create.component.scss']
})
export class JobtitleCreateComponent implements OnInit {
  @Input() item = null;
  _form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _httpJobTitle: JobTitleService,
    private router: Router,
    protected ref: NbDialogRef<JobtitleCreateComponent>

    ) {

     }

  ngOnInit() {
    if (this.item) {
      this.buildEditForm();
    }
    else {
      this.buildAddForm();
    }

  }

  private buildAddForm() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  private buildEditForm() {
    this._form = this.fb.group({
      name: new FormControl(this.item.name, [Validators.required, CustomValidators.rangeLength([1, 500])]),
      id: new FormControl(this.item.id, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.item) {

       this._httpJobTitle.updateJobTitle(this._form.value).subscribe(res => {
          this.dismiss();
        });

    } else {
       this._httpJobTitle.addJobTitle(this._form.value).subscribe(res => {
        this.dismiss();
       });
    }
   
  }

  dismiss(){
    this.ref.close();
  }
}
