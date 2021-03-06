import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/interfaces/application/application';
import { ApplicationDetails } from 'src/app/interfaces/application/application-details';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  applications: ApplicationDetails[];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getInternApplications().subscribe(result => {
      this.applications = result;
    });
  }

}
