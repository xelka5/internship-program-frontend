import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base-http/base-http.service';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { UserDetailsResponse } from 'src/app/interfaces/user/user-details-response';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  readonly usersBaseUrl: string = `${environment.apiUrl}/api/users`;

  public getUserInformation(): Observable<UserDetails> {
    return this.get(this.usersBaseUrl);
  }

  public getUserInformationByEmail(email: string): Observable<UserDetails> {
    this.httpParams = new HttpParams().append('userEmail', email);
    return this.get(`${environment.apiUrl}/api/users/email`);
  }

  public editUserAccount(editAccountRequest: UserDetails): Observable<UserDetailsResponse> {
    return this.put(this.usersBaseUrl, editAccountRequest);
  }

  public uploadProfileImage(profileImage: File, email: string): Observable<BaseHttpResponse> {
    const formData: FormData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('email', email);

    return this.post(`${environment.apiUrl}/api/users/upload`, formData);
  }
}
