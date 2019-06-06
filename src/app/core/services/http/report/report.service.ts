import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AppTokenService } from './../../../../shared/services/app-token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private appToken: AppTokenService
    ) { }

  getDepartmentDedectionsReport(data) {

    return this.http.get(`${environment.API_BASE + '/Reports/GetDepartmentDedectionsReport' }`, {params: data, responseType: 'blob'});
  }

  getDedectionReportForDepartments(data){
    return this.http.get(`${environment.API_BASE + '/Reports/GetDedectionReportForDepartments' }`, {params: data, responseType: 'blob'});
  }

  downloadDepartmentPdfReport(data){
    return this.http.get(`${environment.API_BASE + '/Reports/DownloadDepartmentPdfReport' }`, {params: data, responseType: 'blob'});
  }
}
