import { BankService } from './../../../../core/services/http/bank/bank.service';
import { JobTitleService } from './../../../../core/services/http/jobtitle/jobtitle.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss']
})
export class BankCreateComponent implements OnInit {
  @Input() item = null;
  _form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _httpBank : BankService,
    private router: Router,
    protected ref: NbDialogRef<BankCreateComponent>

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

       this._httpBank.updateBank(this._form.value).subscribe(res => {
          this.dismiss();
        });

    } else {
       this._httpBank.addBank(this._form.value).subscribe(res => {
        this.dismiss();
       });
    }
  }

  dismiss(){
    this.ref.close();
  }
}
