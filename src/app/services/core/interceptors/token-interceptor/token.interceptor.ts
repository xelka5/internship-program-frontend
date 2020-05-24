import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { REFRESH_TOKEN_LABEL } from 'src/app/shared/constants/global-constants';
import { CommunicationUtils } from 'src/app/utils/communication-utils';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private LOGIN_URL: string = 'oauth/token';

  constructor(public authService: AuthService, public communicationUtils: CommunicationUtils) { }

  /**
   * Intercepting and attaching proper authorization token to the request.
   * In case 401 http error code, refresh token and retry the request,
   * otherwise throw error.
   * 
   * @param request - the request to be handled
   * @param next - handler for handling incoming steps
   * @returns Observable handled by success or error case
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes(this.LOGIN_URL)) {
      // TODO: client credentials and access tokens should be passed with HttpOnly cookie instead
      // of saving them in browser cache or any other browser storage
      const headers = new HttpHeaders({
        'Authorization': 'Basic aW50ZXJuc2hpcDokM2NyM1RmMHJEM1ZwdXJwMCRlJA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      request = request.clone({headers});
    } else {
      request = this.addTokenToRequest(request);
    }

    return next.handle(request).pipe(catchError(error => {
      if(request.url.includes(this.LOGIN_URL)) {
        this.authService.logout();
        return throwError(error);
      }

      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      }
      
      return throwError(error);
    }));
  }

  /**
   * Attaching the token to the ongoing http request.
   * In case token not present, log out the user.
   * 
   * @param request - the request to be handled
   */
  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    if(this.authService.isTokenStored()) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    } else {
      this.authService.logout();
    }
  }

  /**
   * If 401 error received, try refreshing the token and retry the request.
   * In case refresh token fails for some reason, reject the request and return to home page.
   * 
   * @param request - the request to be handled
   * @param next - handler for handling incoming steps
   * @returns Observable handled by success or error case
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refreshToken(localStorage.getItem(REFRESH_TOKEN_LABEL))
      .pipe(switchMap(result => {
        this.authService.storeToken(result);
        request = this.addTokenToRequest(request);
        return next.handle(request); 
      }),
      catchError(err => {
        return throwError(err);
      })
    );   
  }

}