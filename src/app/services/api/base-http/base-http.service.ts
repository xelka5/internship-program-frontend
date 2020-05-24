import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  httpHeaders: HttpHeaders;
  httpParams: HttpParams;
  url: string;

  constructor(protected http: HttpClient) { }

  /**
   * Performing generic GET http operation
   */
  protected get<T>(url: string): Observable<T> {
    const observable = this.http
      .get<T>(url, { headers: this.httpHeaders, params: this.httpParams })
      .pipe(catchError(this.handleError));

    this.clearOptions();
    return observable;
  }

  /**
   * Performing generic POST http operation
   * @param body request body
   */
  protected post<T>(url: string, body: object): Observable<T> {
    const observable = this.http
      .post<T>(url, body, { headers: this.httpHeaders, params: this.httpParams })
      .pipe(catchError(this.handleError));

    this.clearOptions();
    return observable;
  }

  /**
   * Performing generic PUT http operation
   * @param body request body
   */
  protected put<T>(url: string, body: object): Observable<T> {
    const observable = this.http
      .put<T>(url, body, { headers: this.httpHeaders, params: this.httpParams })
      .pipe(catchError(this.handleError));

    this.clearOptions();
    return observable;
  }

  /**
   * Performing generic PATCH http operation
   * @param body request body
   */
  protected patch<T>(url: string, body: object): Observable<T> {
    const observable = this.http
      .patch<T>(url, body, { headers: this.httpHeaders, params: this.httpParams })
      .pipe(catchError(this.handleError));

    this.clearOptions();
    return observable;
  }

  /**
   * Performing generic DELETE http operation
   * @param body request body
   */
  protected delete<T>(url: string): Observable<T> {
    const observable = this.http
      .delete<T>(url, { headers: this.httpHeaders, params: this.httpParams })
      .pipe(catchError(this.handleError));

    this.clearOptions();
    return observable;
  }

  /**
   * Appyling query parameters
   * @param params  - query parameters
   */
  protected withParams(params: HttpParams) {
    this.httpParams = params;
    return this;
  }

    /**
   * Appyling request headers
   * @param params  - request headers
   */
  protected withHeaders(headers: HttpHeaders) {
    this.httpHeaders = headers;
    return this;
  }

  /**
   * Clearing all options for generic endpoint
   */
  private clearOptions() {
    this.httpHeaders = null;
    this.httpParams = null;
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(errorMessage);
  }
}
