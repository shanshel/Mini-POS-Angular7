import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-allowances',
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss']
})
export class AllowancesComponent implements OnInit {

  @Input() items: any[];

  constructor() { }

  ngOnInit() {
  }

}
