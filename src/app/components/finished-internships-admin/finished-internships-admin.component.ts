import { Component, OnInit } from '@angular/core';
import { Internship } from 'src/app/interfaces/internship/internship';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finished-internships-admin',
  templateUrl: './finished-internships-admin.component.html',
  styleUrls: ['./finished-internships-admin.component.scss']
})
export class FinishedInternshipsAdminComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  internships: Internship[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getFinishedInternships();
  }

  getFinishedInternships(): void {
    this.adminService.getFinishedInternships().subscribe(result => {
      this.internships = result;
    });
  }

  getDurationLabel(duration: number, durationUnit: string): string {
    if(duration === 1) {
      return duration + ' ' + durationUnit.toLocaleLowerCase();
    }

    return duration + ' ' + durationUnit.toLocaleLowerCase() + 's';
  }

}
