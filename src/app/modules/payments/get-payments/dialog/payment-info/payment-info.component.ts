import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ReusableDialogComponent } from '../../../../reusable/pages/reusable-view-page/reusable-dialog/reusable-dialog.component';

@Component({
  selector: 'ngx-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  @Input() item: any;

  constructor(protected ref: NbDialogRef<ReusableDialogComponent>) { }

  ngOnInit() {
    console.log(this.item);
  }


  dismiss() {
    this.ref.close();
  }

  print(){
   window.print();
  }
}

