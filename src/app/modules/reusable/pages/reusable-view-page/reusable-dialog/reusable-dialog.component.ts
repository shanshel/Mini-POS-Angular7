import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-reusable-dialog',
  templateUrl: './reusable-dialog.component.html',
  styleUrls: ['./reusable-dialog.component.scss']
})
export class ReusableDialogComponent implements OnInit {

  @Input() item;

  ngOnInit() {

  }

  
  constructor(protected ref: NbDialogRef<ReusableDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }

}
