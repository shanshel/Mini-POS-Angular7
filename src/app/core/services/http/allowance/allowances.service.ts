import { StartEndInterface } from './../../../interfaces/startEnd.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AllowancesService {

  constructor(private http: HttpClient) { }

  getAllAllownaces(startEnd: StartEndInterface = {start: 0, end: 10}) {
    return this.http.get(`${environment.EndPoint.OPERATOR}/GetAllowanceTypesAsync?start=${startEnd.start}&end=${startEnd.end}`);
  }

  addNewAllowance(data: any) {
    return this.http.post(`${environment.EndPoint.OPERATOR}/AddAllowanceType`, data);
  }

  editAllowance(data: any) {
    return this.http.post(`${environment.EndPoint.OPERATOR}/UpdateAllowanceTypeAsync`, data);
  }
}
