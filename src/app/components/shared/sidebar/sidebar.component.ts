import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/api/user/user.service';
import { UserRole } from 'src/app/shared/enums/user-role';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  userName: string;
  userRole: string;
  profileImageUrl: string;

  currentLanguage: string;

  langs = ['en', 'bg'];
  
  menus = [];

  constructor(private sidebarService: SidebarService, private authService: AuthService, 
    private translateService: TranslateService, private userService: UserService, 
    private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.initDefaultLanguage();
    this.profileImageUrl = 'assets/images/default_user.png';

    this.userService.getUserInformation().subscribe(result => {
      this.handleSuccessUserDetailsFetch(result);
    });

  }

  public handleSuccessUserDetailsFetch(result: any): void {
    if(result.role === UserRole.INTERN) {
      this.userName = result.userDetails.firstName + ' ' + result.userDetails.lastName;
      this.userRole = UserRole.INTERN;
      this.router.navigate(['/dashboard/search-internships']);
    } else if(result.role === UserRole.EMPLOYER) {
      this.userName = result.userDetails.companyName;
      this.userRole = UserRole.EMPLOYER;
      this.router.navigate(['/dashboard/my-internships']);
    } else if(result.role === UserRole.ADMIN) {
      this.userName = result.account.username;
      this.userRole = UserRole.ADMIN;
      this.router.navigate(['/dashboard/statistics']);
    } else if(result.role === UserRole.PENDING) {
      this.userName = result.account.username;
      this.userRole = UserRole.PENDING;
      this.router.navigate(['/dashboard/pending-info']);
    }

    let profileImageName = result.account.profileImageName;

    if(profileImageName) {
      this.profileImageUrl = `${environment.apiUrl}/` + profileImageName;
    }

    this.menus = this.sidebarService.getMenuList(this.userRole);
  }

  public initDefaultLanguage(): void {
    let browserLang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserLang) > -1) {
      this.setDefaultLang(browserLang);
    } else {
      this.setDefaultLang('en');
    }
  }

  public changeLanguage(): void {
    let currentLang = this.translateService.getDefaultLang();

    if(currentLang === this.langs[0]) {
      this.setDefaultLang(this.langs[1]);
    } else {
      this.setDefaultLang(this.langs[0]);
    }
  }

  private setDefaultLang(language: string) {
    this.translateService.setDefaultLang(language);
    this.currentLanguage = language;
  }

  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  call(currentMenu) {

    if(window.innerWidth < 992) {
      this.sidebarService.toggle();
    }
    if (currentMenu.title === 'COMMON_MENU.LOGOUT') {
      this.authService.logout();
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarService.hasBackgroundImage;
  }

}
