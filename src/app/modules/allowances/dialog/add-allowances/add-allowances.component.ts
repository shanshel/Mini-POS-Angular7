import { CustomValidators } from 'ngx-custom-validators';
import { AllowancesService } from './../../../../core/services/http/allowance/allowances.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-allowances',
  templateUrl: './add-allowances.component.html',
  styleUrls: ['./add-allowances.component.scss']
})
export class DialogAddAllowancesComponent implements OnInit {

  _form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _allowances: AllowancesService,
    private _toastrService: ToastrService,
    private _router: Router,
    private dialogService: NbDialogRef<NbDialogService>
    ) { }

  ngOnInit() {
    this.validateForm();
  }


  private validateForm() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required, CustomValidators.rangeLength([1, 200])]),
      amount: new FormControl('', [Validators.required, CustomValidators.min(1)]),
      type: new FormControl(0)
    });
  }

  get form() {
    return this._form.controls;
  }

  createNewRole() {
    this.form.type.value === true ? this.form.type.setValue(2) : this.form.type.setValue(1) ;

    this._allowances.addNewAllowance(this._form.value).subscribe((data: any) => {
      console.log(data);
      this.dialogService.close();
    });
  }

}
