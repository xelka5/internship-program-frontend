import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { InternshipFinalReports } from 'src/app/interfaces/report/internship-final-reports';
import { CreateFinalReportResponse } from 'src/app/interfaces/report/create-final-report-response';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { CreateFinalReportRequest } from 'src/app/interfaces/report/create-final-report-request';
import { FinalReport } from 'src/app/interfaces/report/final-report';

@Injectable({
  providedIn: 'root'
})
export class FinalReportService extends BaseHttpService {
  
  public getAllInternshipFinalReports(internshipTrackingNumber: string): Observable<InternshipFinalReports> {
    return this.get(`${environment.apiUrl}/api/final-reports/employer/` + internshipTrackingNumber);
  }

  public getInternFinalReportByInternship(internshipTrackingNumber: string): Observable<FinalReport> {
    return this.get(`${environment.apiUrl}/api/final-reports/internship/` + internshipTrackingNumber);
  }

  public createFinalReportEmployer(finalReport: CreateFinalReportRequest): Observable<CreateFinalReportResponse> {
    return this.post(`${environment.apiUrl}/api/final-reports/employer`, finalReport);
  }

  public createFinalReportIntern(finalReport: CreateFinalReportRequest): Observable<CreateFinalReportResponse> {
    return this.post(`${environment.apiUrl}/api/final-reports/intern`, finalReport);
  }

  public uploadReportFile(finalReportFile: File, reportTrackingNumber: string): Observable<BaseHttpResponse> {
    const formData: FormData = new FormData();
    formData.append('reportTrackingNumber', reportTrackingNumber);
    formData.append('finalReportFile', finalReportFile);
    
    return this.post(`${environment.apiUrl}/api/final-reports/upload`, formData);
  }

}