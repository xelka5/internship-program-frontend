import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { LoginResponse } from 'src/app/interfaces/login/login-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService {

  public performLogin(loginRequest: HttpParams): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.withHeaders(headers).post(`${environment.apiUrl}/oauth/token`, loginRequest);
  }

}
