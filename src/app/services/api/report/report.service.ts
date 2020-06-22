import { BaseHttpService } from '../base-http/base-http.service';
import { HttpParams } from '@angular/common/http';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Report } from 'src/app/interfaces/report/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseHttpService {
  
  public getInternReport(reportTrackingNumber: string): Observable<Report[]> {
    return this.get(`${environment.apiUrl}/api/reports/` + reportTrackingNumber);
  }

  public getAllInternshipsReports(internshipTrackingNumber: string): Observable<Report[]> {
    return this.get(`${environment.apiUrl}/api/reports/internship/` + internshipTrackingNumber);
  }

  public addNewInternshipReport(reportRequest: Report): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/reports`, reportRequest);
  }

  public editReport(reportRequest: Report, reportTrackingNumber: string): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/reports/` + reportTrackingNumber, reportRequest);
  }

  public deleteReport(reportTrackingNumber: string) {
      return this.delete(`${environment.apiUrl}/api/reports/` + reportTrackingNumber);
  }

}