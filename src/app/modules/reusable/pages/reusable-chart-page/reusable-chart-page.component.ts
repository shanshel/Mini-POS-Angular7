import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-reusable-chart-page',
  templateUrl: './reusable-chart-page.component.html',
  styleUrls: ['./reusable-chart-page.component.scss']
})
export class ReusableChartPageComponent implements OnInit, OnDestroy {
  showLegend;
  numberOfUsers = 1029;
  numberOfDepartments = 43984;
  numberOfEmployees = 2938390;
  numberOfMinistries = 15;
  numberOfFounders = 30;
  numberOfLoanTypes = 100;
  numberOfLoansTake = 392;

  result = [
    { name: 'القروض الموجودة', value: this.numberOfLoanTypes },
    { name: 'القروض المأخوذة', value: this.numberOfLoansTake },
  ];
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'نوع';
  yAxisLabel = 'العدد';
  colorScheme: any;
  themeSubscription: any;

  constructor() {
 
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
