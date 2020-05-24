import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TokenInfoService } from 'src/app/services/core/token-info/token-info.service';
import { TokenData } from 'src/app/interfaces/token/token-info';

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

  currentLanguage: string;

  langs = ['en', 'bg'];
  
  menus = [];

  constructor(private sidebarService: SidebarService, private authService: AuthService, 
    private translateService: TranslateService, private tokenInfoService: TokenInfoService) {
      let tokenData: TokenData = this.tokenInfoService.getTokenData(this.authService.getToken());
      this.userName = tokenData.user_name;
      this.userRole = tokenData.authorities[0];

      this.menus = sidebarService.getMenuList(this.userRole);
   }

  ngOnInit() {
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
