import { BaseHttpService } from '../base-http/base-http.service';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { UpdatePendingUserStatus } from 'src/app/interfaces/admin/update-pending-user-status';
import { Internship } from 'src/app/interfaces/internship/internship';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseHttpService {
  
  public getPendingApprovals(): Observable<UserDetails[]> {
    return this.get(`${environment.apiUrl}/api/admin/pending`);
  }

  public getFinishedInternships(): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/admin/finished`);
  }

  public getFinalInternshipReports(internshipTrackingNumber: string): Observable<Internship[]> {
    return this.get(`${environment.apiUrl}/api/admin/report/` + internshipTrackingNumber);
  }

  public updatePendingUserStatus(updateBody: UpdatePendingUserStatus): Observable<BaseHttpResponse> {
    return this.put(`${environment.apiUrl}/api/admin/pending`, updateBody);
  }

}