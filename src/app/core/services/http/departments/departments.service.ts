import { AppTokenService } from './../../../../shared/services/app-token.service';
import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Employee } from '../../../data/employees';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getDepartments(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetMainDepartments`, {params: data});
  }

  createDepartment(data) {
    return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/AddDepartment`, data);
  }
  

  updateDepartment(data){
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateDepartment`, data);
  }

  getMainDepartmentsWithSubDepts(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetMainDepartmentsWithSubDepts`, {params: data});
  }

  getSubDepartment(id){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetDepartmentsTree`, {params: {deptId:id}});
  }
  deleteEmployee(data) {

  }
}
