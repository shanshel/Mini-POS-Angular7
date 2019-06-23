import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AppTokenService } from './../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  constructor(
    private http: HttpClient,
    private appToken: AppTokenService,

    ) { }

  GetInvoices(data) {
    return this.http.get(`${environment.API_BASE}/Invoices/GetInvoices`, {params: data});
  }

  AddInvoice(formData) {
    return this.http.post(`${environment.API_BASE}/Invoices/AddInvoice`, formData);
  }
  
  UpdateInvoice(formData, id) {
    return this.http.post(`${environment.API_BASE}/Invoices/${id}/UpdateInvoice`, formData);
  }

  PayFixedAmount(formData){
    return this.http.post(`${environment.API_BASE}/Invoices/PayFixedAmount`, formData);
  }

}
