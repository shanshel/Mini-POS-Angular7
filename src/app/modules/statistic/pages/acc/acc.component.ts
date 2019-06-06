import { Component, OnInit } from '@angular/core';
import {StatisticsServeice} from '../../../../core/services/http/statistics/statistics.service';
import { NbThemeService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';

import { from } from 'rxjs';
@Component({
  selector: 'ngx-statistic-admin',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements  OnInit {
  totalNumOfUser;
  totalNumOfEmployees;
  totalNumOfDepartments;
  data:[];
  EmployeesPerRole;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'نوع';
  yAxisLabel = 'العدد';
  colorScheme: any;
  themeSubscription: any;
  showLegend = true;
  showLabels = true;

 

  constructor(
    private _http: StatisticsServeice,
    private theme: NbThemeService
  ){ this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    const colors: any = config.variables;
    this.colorScheme = {
      domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
    };
  });}
  ngOnInit() {
    this._http.GetUserDepartmentsCount().subscribe(res => {
      this.totalNumOfDepartments = res['data'];
    });
    this._http.GetEmployeesCount().subscribe(res => {
      this.totalNumOfEmployees = res['data'];
    });
    this._http.GetEnrollmentsCount().subscribe(res => {
      this.totalNumOfUser = res['data'];
    });
    this.render();

 
    // this._http.GetSystemStatisticsPeerCompany().subscribe(res => {
    //   this.data = res['data'].map((item) => {
    //       return {
    //         data: [
    //           { name: 'عدد الاقسام', value: item.numberOfDepartments },
    //           { name: 'عدد الموظفين', value: item.numberOfEmployees },
    //           { name: 'عدد المستخدمين', value: item.numberOfUsers },
    //         ],
    //         name: item.name
    //       };
    //     }
    //   );
    // });

  }
  render(){
    setTimeout(() => {
      this.EmployeesPerRole = [
        { name:getTranslate('placement_number') , value: this.totalNumOfUser},
        { name: getTranslate('department_numbers'), value: this.totalNumOfDepartments},
        { name: getTranslate('employs_number'), value: this.totalNumOfEmployees},
      ];
    }, 1000);
   
  }
}


