import { BaseHttpService } from '../base-http/base-http.service';
import { HttpParams } from '@angular/common/http';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Application } from 'src/app/interfaces/application/application';
import { ApplicationDetails } from 'src/app/interfaces/application/application-details';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseHttpService {
  
  public getInternApplications(): Observable<ApplicationDetails[]> {
    return this.get(`${environment.apiUrl}/api/applications`);
  }

  // public getAllInternshipsForEmployer(): Observable<Internship[]> {
  //   return this.get(`${environment.apiUrl}/api/internships/employer`);
  // }

  // public getInternshipByTrackingNumber(trackingNumber: string): Observable<Internship> {
  //   return this.get(`${environment.apiUrl}/api/internships/employer/` + trackingNumber);
  // }

  public addNewApplication(applicationRequest: Application): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/applications`, applicationRequest);
  }

  // public editInternship(internshipRequest: Internship): Observable<BaseHttpResponse> {
  //   return this.put(`${environment.apiUrl}/api/internships/employer`, internshipRequest);
  // }

}