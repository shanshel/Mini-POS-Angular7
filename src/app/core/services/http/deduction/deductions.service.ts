import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeductionsService {

  constructor(private http: HttpClient) { }


  getAllDeductions(startEnd: StartEndInterface = {start: 0, end: 10}) {
    return this.http.get(`${environment.EndPoint.OPERATOR}/GetServicesAsync?start=${startEnd.start}&end=${startEnd.end}`);
  }

  addDeductions(data: any) {
    return this.http.post(`${environment.EndPoint.OPERATOR}/AddService`, data);
  }

  editDeductions(data: any) {
    return this.http.post(`${environment.EndPoint.OPERATOR}/UpdateServiceAsync`, data);
  }
}
