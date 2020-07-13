import { Injectable } from '@angular/core';
import { RegistrationRequest } from 'src/app/interfaces/registration/registration-request';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';
import { RegistrationResponse } from 'src/app/interfaces/registration/registration-response';
import { BaseHttpResponse } from 'src/app/interfaces/base/base-http-response';
import { CheckEmailExistsResponse } from 'src/app/interfaces/check-email/check-email-exists-response';
import { CheckEmailExistsRequest } from 'src/app/interfaces/check-email/check-email-exists-request';
import { ConfirmRegistrationRequest } from 'src/app/interfaces/confirm-registration/confirm-registration-request';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttpService {

  public performRegistration(registrationRequest: RegistrationRequest): Observable<RegistrationResponse> {
    return this.post(`${environment.apiUrl}/api/users/registration`, registrationRequest);
  }

  public uploadProfileImage(profileImage: File, email: string): Observable<BaseHttpResponse> {
    const formData: FormData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('email', email);

    return this.post(`${environment.apiUrl}/api/users/registration/upload`, formData);
  }

  public checkIfEmailAlreadyExists(request: CheckEmailExistsRequest): Observable<CheckEmailExistsResponse> {
    return this.post(`${environment.apiUrl}/api/users/registration/email-check`, request);
  }

  public confirmRegistration(request: ConfirmRegistrationRequest): Observable<BaseHttpResponse> {
    return this.post(`${environment.apiUrl}/api/users/registration/confirm`, request);
  }
}
