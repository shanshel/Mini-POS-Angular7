import { AppTokenService } from    './../../../../shared/services/app-token.service';
import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Employee } from '../../../data/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getEmployees(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeesAsync`, {params: data});
  }

  getEmployeesByName(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeesByName`, {params: data});
  }
  
  getEmployeeByQiSmartId(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByQiSmartId`, {params: data});
  }

  getEmployeeByQiCardNumber(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByQiCardNumber`, {params: data});
  }
  
  getEmployeeByQiAccountNumber(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByQiAccountNumber`, {params: data});
  }

  getEmployeeByGovFamilyId(data: any) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByGovFamilyId`, {params: data});
  }

  getEmployeeByGovCardId(data: any) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByGovCardId`, {params: data});
  }

  getEmployeeByGovId(data: any) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByGovId`, {params: data});
  }

  getEmployeeByPublicEmployerId(data: any) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeByPublicEmployerId`, {params: data});
  }

  

  createEmployee(data) {
    return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/AddEmployee`, data);
  }
  

  updateEmployee(data){
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateEmployee`, data);
  }

  getEmployee(id) {
    return this.http.get(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/GetEmployeeById`, {params: {
      emplyeeId: id
    }});
  }

  deleteEmployee(data) {

  }

  getEmployeeDeductions(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeDeductions`, {params: data});
  }

  getEmployeeAllowances(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEmployeeAllowances`, {params: data});
  }

  getBasicSalaryAsync(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetBasicSalaryAsync`, {params: data});
  }

  getTotalSalaryAsync(data){
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetTotalSalaryAsync`, {params: data});
  }

  getnetSalaryAsync(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetnetSalaryAsync`, {params: data});
  }

  deleteEmployeeDeduction(data) {
    return this.http.delete(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/DeleteEmployeeDeduction`, {params: data});

  }

  deleteEmployeeAllowance(data) {
    return this.http.delete(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/DeleteEmployeeAllowance`, {params: data});

  }

  addDeduction(data){
    return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/AddDeduction`, data);
  }

  uploadFile(data){
    return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/UploadFile`, data);
  }

  addEmployeeAllowance(data){
    return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/AddEmployeeAllowance`, data);
  }




}
