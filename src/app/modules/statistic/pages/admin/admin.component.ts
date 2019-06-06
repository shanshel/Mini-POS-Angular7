import { Component, OnInit } from '@angular/core';
import {StatisticsServeice} from './../../../../core/services/http/statistics/statistics.service';
import { NbThemeService } from '@nebular/theme';
import { getTranslate } from '../../../../lang';

@Component({
  selector: 'ngx-statistic-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements  OnInit {
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
  banksReport;
 

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
    this._http.GetDepartmentsCount().subscribe(res => {
      this.totalNumOfDepartments = res['data'];
    });
    this._http.GetEmployeesCount().subscribe(res => {
      this.totalNumOfEmployees = res['data'];
    });
    this._http.GetUsersCount().subscribe(res => {
      this.totalNumOfUser = res['data'];
    });
    this._http.getBanksMonthlyReports().subscribe(res =>{
      this.banksReport = res['data'];
    });
    this.render();

  }
  render(){
    setTimeout(() => {
      this.EmployeesPerRole = [
        { name: getTranslate('placement_number') , value: this.totalNumOfUser},
        { name:getTranslate('department_numbers'), value: this.totalNumOfDepartments},
        { name: getTranslate('employs_number'), value: this.totalNumOfEmployees},
      ];
    }, 1000);
   
  }
}
