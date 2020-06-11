import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/interfaces/application/application';
import { ApplicationDetails } from 'src/app/interfaces/application/application-details';
import { ApplicationService } from 'src/app/services/api/application/application.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  applications: ApplicationDetails[];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getInternApplications().subscribe(result => {
      console.log(result);
      this.applications = result;
    });
  }

}
