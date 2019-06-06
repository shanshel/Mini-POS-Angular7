import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'ngx-reusable-create-page',
  templateUrl: './reusable-create-page.component.html',
  styleUrls: ['./reusable-create-page.component.scss']
})
export class ReusableCreatePageComponent implements OnInit {
  _form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm();
    console.log(this._form);
  }


  private validateForm() {
    this._form = this.fb.group({
      ministryName: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required, CustomValidators.rangeLength([4, 40])]),
      motherFullName: new FormControl('', [Validators.required, CustomValidators.rangeLength([4, 40])]),
      phoneNumber: new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([10, 12])]),
      smartNumber: new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([5, 15])])
    });
  }

  get form() {
    return this._form.controls;
  }

}
