import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.authService.clearTokenStorage();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}