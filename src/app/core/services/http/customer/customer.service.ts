import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getCustomers(data) {
    return this.http.get(`${environment.API_BASE}/Customers/GetCustomers`, {params: data});
  }
  
  getCustomer(id) {
    return this.http.get(`${environment.API_BASE + '/'}/Customers/GetCustomer`, {params:{
        id: id
    }});
  }

  addCustomer(formData) {
    return this.http.post(`${environment.API_BASE}/Customers/AddCustomer`, formData);
  }
  
  updateCustomer(formData, id) {
    return this.http.post(`${environment.API_BASE}/Customers/${id}/UpdateCustomer`, formData);
  }

}
