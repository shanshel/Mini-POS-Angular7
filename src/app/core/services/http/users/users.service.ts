import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getUsers(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetUsers`, {params: data});
  }

  getUser(id) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetUserById`, {params:{
        userId: id
    }});
  }

  createUser(formData) {
      return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/AddUser`, formData);
  }
  
  GetDepartments(start , end ) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetMainDepartmentsWithSubDepts`, {params:{
      start: start,
      end: end,
    }});
  }

  updateUser(formData){
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateUser`, formData);
  }

  AttatchDepartmentToUser(formData){
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/AttatchDepartmentToUser`, formData);
  }
  

}
