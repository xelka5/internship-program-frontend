import { Injectable } from '@angular/core';
import { adminMenu, employerMenu, internMenu, guestMenu, pendingMenu, blockedMenu } from './';
import { UserRole } from 'src/app/shared/enums/user-role';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList(userRole: string) {
    switch(userRole) {
      case UserRole.ADMIN:
        return adminMenu;
      case UserRole.EMPLOYER:
        return employerMenu;
      case UserRole.INTERN:
        return internMenu;
      case UserRole.PENDING:
        return pendingMenu;
      case UserRole.BLOCKED:
        return blockedMenu;
      default:
        return guestMenu;
    }
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
