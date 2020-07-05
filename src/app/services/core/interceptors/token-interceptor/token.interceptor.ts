import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { REFRESH_TOKEN_LABEL } from 'src/app/shared/constants/global-constants';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private LOGIN_URL: string = 'oauth/token';
  private REGISTRATION_URL: string = 'api/users/registration';

  constructor(public authService: AuthService, private toastr: ToastrService) { }

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
      const headers = new HttpHeaders({
        'Authorization': 'Basic aW50ZXJuc2hpcDokM2NyM1RmMHJEM1ZwdXJwMCRlJA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      request = request.clone({headers});
    } else if(request.url.includes(this.REGISTRATION_URL)) {
      // continue without modifying request
    } else {
      request = this.addTokenToRequest(request);
    }

    return next.handle(request).pipe(catchError(error => {
      if(request.url.includes(this.LOGIN_URL)) {
        this.authService.logout();
        return throwError(error);
      }

      if (error instanceof HttpErrorResponse) {
        if(error.status === 401) {
          return this.handle401Error(request, next);
        } else if(error.status >= 400 && error.status < 500) {
          this.toastr.warning(error.error.message);
        } else if(error.status >= 500 && error.status < 600) {
          this.toastr.error(error.error.message);
        } 
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