import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
  @Input() message = "هل انت متأكد من رغبتك بالحذف";
  @Input() item;
  @Output() boolConfDelete;


  constructor(protected ref: NbDialogRef<DialogConfirmationComponent>,) { }

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
