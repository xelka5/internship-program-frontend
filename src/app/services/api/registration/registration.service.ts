import { Injectable } from '@angular/core';
import { RegistrationRequest } from 'src/app/interfaces/registration/registration-request';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base-http/base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttpService {

  public performRegistration(registrationRequest: RegistrationRequest): Observable<RegistrationRequest> {
    return this.post(`${environment.apiUrl}/api/users/registration`, registrationRequest);
  }
}
