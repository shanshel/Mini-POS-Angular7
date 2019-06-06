import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsServeice {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService

    ) { }


  GetSystemStatistics() {
    return this.http.get(`${environment.EndPoint.SITEADMIN}/GetSystemStatistics`);
  }

  GetSystemStatisticsPeerCompany() {
    return this.http.get(`${environment.EndPoint.SITEADMIN}/GetSystemStatisticsPeerCompany`);
  }


  GetManagerSystemStatistics() {
    return this.http.get(`${environment.EndPoint.MANAGER}/GetSystemStatistics`);
  }

  GetEmployeesCount(){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeesCount`);
  }

  GetDepartmentsCount(){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetDepartmentsCount`);
  }

  GetUsersCount(){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetUsersCount`);
  }

  GetEnrollmentsCount(){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEnrollmentsCount`);
  }

  GetUserDepartmentsCount(){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetUserDepartmentsCount`);
  }

  getStatistic(){
    return this.http.get(`${environment.API_BASE}/Reports/GetStatistics`);
  }

  getBanksMonthlyReports(){
    return this.http.get(`${environment.API_BASE}/Reports/GetBanksMonthlyReports`);
  }

  downloadJsonAsync() {
    return this.http.get(`${environment.API_BASE}/Reports/DownloadJsonAsync`);
  }

}
