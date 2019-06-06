import { AppTokenService } from './../../../../shared/services/app-token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }


  createEnrollment(data) {
      return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/AddEnrollment`, data);
  }


  getEnrollments(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEnrollments`, {params: data});
  }


  updateEnrollment(data) {
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateEnrollment`, data);
  }

  removeEnrollment(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetEnrollments`, {params: data});

  }
}
