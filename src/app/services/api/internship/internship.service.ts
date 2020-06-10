import { BaseHttpService } from '../base-http/base-http.service';
import { HttpParams } from '@angular/common/http';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternshipService extends BaseHttpService {
  
  public getAllInternships(): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/internships`);
  }

  public getAllInternshipsForEmployer(): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/internships/employer`);
  }

  public getInternshipByTrackingNumber(trackingNumber: string): Observable<Internship> {
    return this.get(`${environment.apiUrl}/api/internships/employer/` + trackingNumber);
  }

  public addNewInternship(internshipRequest: Internship): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/internships`, internshipRequest);
  }

  public editInternship(internshipRequest: Internship): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/internships/employer`, internshipRequest);
  }

}