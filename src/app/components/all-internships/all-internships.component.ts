import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { ToastrService } from 'ngx-toastr';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { Application } from 'src/app/interfaces/application/application';
import { environment } from 'src/environments/environment';
import { InternshipStatus } from 'src/app/shared/enums/internship-status';

@Component({
  selector: 'app-all-internships',
  templateUrl: './all-internships.component.html',
  styleUrls: ['./all-internships.component.scss']
})
export class AllInternshipsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  modalRef: BsModalRef;

  internships: Internship[];
  internshipTrackingNumber: string;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllInternships();
  }

  getAllInternships(): void {
    this.internshipService.getAllInternshipsByStatus(InternshipStatus.ACTIVE).subscribe(result => {
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
