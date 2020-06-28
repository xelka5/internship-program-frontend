import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtTokenGetter } from '.';
import { LoginResponse } from 'src/app/interfaces/login/login-response';
import { ACCESS_TOKEN_LABEL, REFRESH_TOKEN_LABEL, GRANT_TYPE_REFRESH_TOKEN } from 'src/app/shared/constants/global-constants';
import { BaseHttpService } from '../../api/base-http/base-http.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { TokenDecoded } from 'src/app/interfaces/token/token-decoded';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  constructor(private jwtHelper: JwtHelperService, private _http: HttpClient, private router: Router) { 
    super(_http);
  }

  public isTokenStored(): boolean {
    return jwtTokenGetter() !== null;
  }

  public getToken(): string {
    return jwtTokenGetter();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public checkRoleAuthentication(roles: string[]): boolean {
    const token = this.getToken();
    const tokenDecoded: TokenDecoded = jwt_decode(token);

    return roles.includes(tokenDecoded.authorities[0]) && !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    this.clearTokenStorage();
    this.router.navigateByUrl('/login');
  }

  public storeToken(loginResponse: LoginResponse): void {
    localStorage.setItem(ACCESS_TOKEN_LABEL, loginResponse.access_token);
    localStorage.setItem(REFRESH_TOKEN_LABEL, loginResponse.refresh_token);
  }

  public clearTokenStorage(): void {
    localStorage.removeItem(ACCESS_TOKEN_LABEL);
    localStorage.removeItem(REFRESH_TOKEN_LABEL);
  }

  public refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.withHeaders(headers)
      .post(`${environment.apiUrl}/oauth/token`, this.createRefreshTokenRequestBody(refreshToken));
  }

  private createRefreshTokenRequestBody(refreshToken: string): HttpParams {
    return new HttpParams()
      .append('refresh_token', refreshToken)
      .append('grant_type', GRANT_TYPE_REFRESH_TOKEN);
  }

}
