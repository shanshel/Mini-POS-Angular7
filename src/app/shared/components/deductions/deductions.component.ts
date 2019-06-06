import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.scss']
})
export class DeductionsComponent implements OnInit {

  @Input() items: any[];

  constructor() {
    console.log("the input is", this.items);
   }

  ngOnInit() {
   
  }

}
