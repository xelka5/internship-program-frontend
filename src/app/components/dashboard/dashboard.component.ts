import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  shouldDisplayHeader: boolean = false;

  ngOnInit() { }

  constructor(public sidebarservice: SidebarService) {
    if(window.innerWidth < 768) {
      this.shouldDisplayHeader = true;
      this.sidebarservice.setSidebarState(true);
    }
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  
}
