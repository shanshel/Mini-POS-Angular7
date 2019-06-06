import { CustomValidators } from 'ngx-custom-validators';
import { DeductionsService } from './../../../../core/services/http/deduction/deductions.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AllowancesService } from '../../../../core/services/http/allowance/allowances.service';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-deduction',
  templateUrl: './add-deduction.component.html',
  styleUrls: ['./add-deduction.component.scss']
})
export class AddDeductionComponent implements OnInit {

  _form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _deductions: DeductionsService,
    private _toastrService: ToastrService,
    private _router: Router,
    private dialogService: NbDialogRef<NbDialogService>
    ) { }

  ngOnInit() {
    this.validateForm();
  }


  private validateForm() {
    this._form = this.fb.group({
      name: new FormControl('', [Validators.required, CustomValidators.rangeLength([1, 300])]),
      kind: new FormControl(false),
      type: new FormControl(false)
    });
  }

  get form() {
    return this._form.controls;
  }

  createNewRole() {
    let formValue = this._form.value;
    formValue.type === true ? formValue.type = 2 : formValue.type = 1;
    formValue.kind === true ? formValue.kind = 1 : formValue.kind = 2;
    console.log(formValue);
    this._deductions.addDeductions(formValue).subscribe((data: any) => {
      console.log(data);
      this.dialogService.close();
    });
  }

}
