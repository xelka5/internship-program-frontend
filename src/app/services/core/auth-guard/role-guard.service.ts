import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.checkRoleAuthentication(route.data.expectedRoles)) {
      this.authService.clearTokenStorage();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}