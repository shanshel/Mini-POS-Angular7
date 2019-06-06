import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AllowancesService } from '../../../../core/services/http/allowance/allowances.service';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'ngx-edit-allowances',
  templateUrl: './edit-allowances.component.html',
  styleUrls: ['./edit-allowances.component.scss']
})
export class DialogEditAllowancesComponent implements OnInit {
  item: any;
  _form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _allowances: AllowancesService,
    private _toastrService: ToastrService,
    private _router: Router,
    private dialogService: NbDialogRef<NbDialogService>,

    ) { }

  ngOnInit() {
    this.validateForm();

    if(this.item.type === 1) {
      this.form.type.setValue(0);
    } else {
      this.form.type.setValue(1);
    }

  }


  private validateForm() {
    this._form = this.fb.group({
      id: new FormControl(this.item.id),
      name: new FormControl(this.item.name, [Validators.required, CustomValidators.rangeLength([1, 200])]),
      amount: new FormControl(this.item.amount, [Validators.required, CustomValidators.min(1)]),
      type: new FormControl(0),
      status: new FormControl(1)
    });
  }

  get form() {
    return this._form.controls;
  }


  updateAllowance() {
    let submittedData = this._form.value;
    submittedData.type = (submittedData.type === true) ? 1 : 0;
    this._allowances.editAllowance(this._form.value).subscribe((data: any) => {
      this.dialogService.close();
    });
  }
}
