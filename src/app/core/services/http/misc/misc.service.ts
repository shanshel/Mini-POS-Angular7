import { AppTokenService } from './../../../../shared/services/app-token.service';
import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Employee } from '../../../data/employees';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

   
    getServices(data) {
        return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetServicesAsync`, {params: data});
    }

    getAllowanceTypes(data) {
        return this.http.get(`${environment.API_BASE + '/'  + this.appToken.getRoleForApi()}/GetAllowanceTypesAsync`, {params: data});
    }

    getAbsenceAmount(data) {
      return this.http.post(`${environment.API_BASE + '/' + this.appToken.getRoleForApi()}/GetAbsenceAmount`, data);
    }

}
