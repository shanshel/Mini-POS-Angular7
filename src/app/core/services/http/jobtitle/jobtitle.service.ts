import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getJobTitles(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetJobTitles`, {params: data});
  }

  getJobTitle(id) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetJobTitle`, {params:{
        id: id
    }});
  }

  addJobTitle(formData) {
      return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/AddJobTitle`, formData);
  }
  
  updateJobTitle(formData) {
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateJobTitle`, formData);
  }
  

}
