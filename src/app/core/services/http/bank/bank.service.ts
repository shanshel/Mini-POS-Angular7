import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getBanks(data) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetBanks`, {params: data});
  }
  
  getBank(id) {
    return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/getBank`, {params:{
        id: id
    }});
  }

  addBank(formData) {
      return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/AddBank`, formData);
  }
  
  updateBank(formData) {
    return this.http.post(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/UpdateBank`, formData);
  }
  

}
