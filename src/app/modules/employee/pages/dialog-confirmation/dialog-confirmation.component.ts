import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { EmployeesService } from '../../../../core/services/http/employees/employees.service';
import { NbDialogRef } from '@nebular/theme';
import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
  @Input() message =getTranslate('confirm_deletion') ;
  @Input() item;
  @Output() boolConfDelete;
  dedc:any;


  constructor(
    protected ref: NbDialogRef<DialogConfirmationComponent>,
    private _employees: EmployeesService,
    ) { }

  ngOnInit() {
  }

  confDelete(){
    this.boolConfDelete = true;
    
    this.dismiss();
  }

  cancelDelete() {
    this.boolConfDelete = false;
    this.dismiss();
  }

  dismiss(){
    this.ref.close(this.boolConfDelete);
  }
}
