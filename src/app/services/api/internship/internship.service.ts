import { BaseHttpService } from '../base-http/base-http.service';
import { HttpParams } from '@angular/common/http';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AssignedIntern } from 'src/app/interfaces/assigned-intern/assigned-intern';
import { FinishInternship } from 'src/app/interfaces/internship/finish-internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService extends BaseHttpService {

  public getAllInternships(): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/internships`);
  }

  public getActiveInternInternships(): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/internships/active`);
  }

  public getEmployerInternshipsByStatus(status: string): Observable<Internship[]> {
    this.httpParams = new HttpParams().append('status', status);
    return this.get(`${environment.apiUrl}/api/internships/employer`);
  }

  public getInternshipByTrackingNumber(trackingNumber: string): Observable<Internship> {
    return this.get(`${environment.apiUrl}/api/internships/employer/` + trackingNumber);
  }

  public getAssignedInterns(trackingNumber: string): Observable<AssignedIntern[]> {
    return this.get(`${environment.apiUrl}/api/internships/employer/assigned/` + trackingNumber);
  }

  public addNewInternship(internshipRequest: Internship): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/internships`, internshipRequest);
  }

  public editInternship(internshipRequest: Internship): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/internships/employer`, internshipRequest);
  }

  public finishInternship(finishInternshipRequest: FinishInternship): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/internships/employer/finish`, finishInternshipRequest);
  }

  public deleteInternship(trackingNumber: string): Observable<BaseHttpResponse> {
    return this.delete(`${environment.apiUrl}/api/internships/employer/` + trackingNumber);
  }

}