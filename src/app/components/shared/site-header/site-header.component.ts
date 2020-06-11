import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  @Output() toggleSidebarEmitter: EventEmitter<any> = new EventEmitter<any>();

  isSidebarActive: boolean;
  isUserLogged: boolean; 

  constructor(private router: Router, private authService: AuthService, private translateService: TranslateService) { }

  ngOnInit() {
    this.isSidebarActive = this.router.url.includes('dashboard');

    if(this.authService.getToken() != null) {
      this.isUserLogged = true;
    }
  }

  toggleSidebar() {
    this.toggleSidebarEmitter.emit();
  }

  navigateToDefaultUrl() {
    if(this.isUserLogged) {
      this.router.navigateByUrl('dashboard/active');
    } else {
      this.router.navigateByUrl('');
    }
  }

}
