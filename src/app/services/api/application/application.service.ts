import { BaseHttpService } from '../base-http/base-http.service';
import { HttpParams } from '@angular/common/http';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Application } from 'src/app/interfaces/application/application';
import { ApplicationDetails } from 'src/app/interfaces/application/application-details';
import { ApplicationResponse } from 'src/app/interfaces/application/application-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseHttpService {
  
  public getInternApplications(): Observable<ApplicationDetails[]> {
    return this.get(`${environment.apiUrl}/api/applications`);
  }

  public getPendingApplications(): Observable<ApplicationDetails[]> {
    return this.get(`${environment.apiUrl}/api/applications/employer/pending`);
  }

  public addNewApplication(applicationRequest: Application): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/applications`, applicationRequest);
  }

  public updateApplication(applicationResponse: ApplicationResponse): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/applications/employer`, applicationResponse);
  }

}