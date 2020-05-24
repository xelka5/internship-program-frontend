import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  public getMeTest(): Observable<any> {
    return this.get(`${environment.apiUrl}/api/users`);
  }
}
