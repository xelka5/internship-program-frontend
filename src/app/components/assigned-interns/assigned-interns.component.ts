import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { UserService } from 'src/app/services/api/user/user.service';
import { ReportService } from 'src/app/services/api/report/report.service';
import { AssignedIntern } from 'src/app/interfaces/assigned-intern/assigned-intern';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { Report } from 'src/app/interfaces/report/report';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UrlService } from 'src/app/services/core/url/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assigned-interns',
  templateUrl: './assigned-interns.component.html',
  styleUrls: ['./assigned-interns.component.scss']
})
export class AssignedInternsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;
  
  modalRef: BsModalRef;

  pageNumber: number = 1;

  assignedInterns: AssignedIntern[];
  internDetails: UserDetails;
  internReports: Report[];
  selectedInternNames: string;
  internshipTrackingNumber: string;


  constructor(private internshipService: InternshipService, private userService: UserService, 
    private reportService: ReportService, private modalService: BsModalService,
    private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    this.internshipTrackingNumber = this.urlService.getTrackingNumberFromUrl(this.router.url);

    this.internshipService.getAssignedInterns(this.internshipTrackingNumber).subscribe(result => {
      this.assignedInterns = result;
    })
  }

  openInternProfileModal(template: TemplateRef<any>, internEmail: string) {
    this.userService.getUserInformationByEmail(internEmail).subscribe(result => {
      this.internDetails = result 
    });
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openInternReportsModal(template: TemplateRef<any>, intern: AssignedIntern) {
    this.selectedInternNames = intern.firstName + ' ' + intern.lastName;

    this.reportService.getAllReportsByInternEmail(this.internshipTrackingNumber, intern.email).subscribe(result => {
      this.internReports = result;
    })
    
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

}
