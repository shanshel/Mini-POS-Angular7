import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { AppTokenService } from '../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getAllPayments(date: string, startEnd: StartEndInterface = {start: 0, end: 10}) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetPayments?date=${date}&start=${startEnd.start}&end=${startEnd.end}`);
  }

  getLast3payments() {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetLastPaymentsDate`);
  }

  CalculatePayments(id: any){
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/CalculatePayments`, {params: {
      creatorId: id
    }});
  }

  getEmployeesPaymentByName(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeesPaymentByName`, {params: data});
  }
  
  searchForEmployeeBySomething(something: string, searchTerm: string) {
    let upperCased = `${something.charAt(0).toUpperCase()}${something.substr(1)}`;
    if(something === 'name') {
      return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeesBy${upperCased}?${something}=${searchTerm}`);
    } else {
      return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeBy${upperCased}?${something}=${searchTerm}`);
    }
  }
}
