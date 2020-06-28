import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Internship } from 'src/app/interfaces/internship/internship';

@Component({
  selector: 'app-intern-reports',
  templateUrl: './intern-reports.component.html',
  styleUrls: ['./intern-reports.component.scss']
})
export class InternReportsComponent implements OnInit {

  internships: Internship[];

  constructor(private internshipService: InternshipService, private modalService: BsModalService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllInternships();
  }

  getAllInternships(): void {
    // this.internshipService.getAllInternshipsForEmployer().subscribe(result => {
    //   this.internships = result;
    // });
  }

}
