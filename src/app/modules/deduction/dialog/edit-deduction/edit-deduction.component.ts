import { CustomValidators } from 'ngx-custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeductionsService } from '../../../../core/services/http/deduction/deductions.service';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-deduction',
  templateUrl: './edit-deduction.component.html',
  styleUrls: ['./edit-deduction.component.scss']
})
export class EditDeductionComponent implements OnInit {
  item: any;
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

    this.form.type.setValue(this.item.type === 1 ? false : true);
    this.form.kind.setValue(this.item.kind === 1 ? true : false);

  }


  private validateForm() {
    this._form = this.fb.group({
      id: new FormControl(this.item.id),
      name: new FormControl(this.item.name, [Validators.required, CustomValidators.rangeLength([1, 300])]),
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
    formValue.kind === true ? formValue.kind = 1 : formValue.kind = 1;

    this._deductions.editDeductions(formValue).subscribe((data: any) => {
      this.dialogService.close();
    });
  }

}
