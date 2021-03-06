import { Component, OnInit } from '@angular/core';
import { Internship } from 'src/app/interfaces/internship/internship';
import { InternshipService } from 'src/app/services/api/internship/internship.service';

@Component({
  selector: 'app-finished-internships-employer',
  templateUrl: './finished-internships-employer.component.html',
  styleUrls: ['./finished-internships-employer.component.scss']
})
export class FinishedInternshipsEmployerComponent implements OnInit {

  internships: Internship[];

  pageNumber: number = 1;

  constructor(private internshipService: InternshipService) { }

  ngOnInit(): void {
    this.getFinishedInternships();
  }

  getFinishedInternships(): void {
    this.internshipService.getEmployerInternshipsByStatus('FINISHED').subscribe(result => {
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
