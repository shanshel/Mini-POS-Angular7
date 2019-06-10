import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AppTokenService } from './../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  GetItems(data) {
    return this.http.get(`${environment.API_BASE}/Items/GetItems`, {params: data});
  }

  AddItem(formData) {
    return this.http.post(`${environment.API_BASE}/Items/AddItem`, formData);
  }
  
  UpdateItem(formData, id) {
    return this.http.post(`${environment.API_BASE}/Items/${id}/UpdateItem`, formData);
  }


}
