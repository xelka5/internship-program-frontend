import { Component, OnInit, TemplateRef, ApplicationInitStatus } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { UserService } from 'src/app/services/api/user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApplicationResponse } from 'src/app/interfaces/application/application-response';
import { ApplicationStatus } from 'src/app/shared/enums/application-status';

@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.scss']
})
export class PendingApplicationsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;
  
  pendingApplications: any[];
  internDetails: UserDetails;

  modalRef: BsModalRef;

  applicationResponseForm: FormGroup;
  applicationTrackingNumber: string;

  constructor(private applicationService: ApplicationService, private modalService: BsModalService,
    private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPendingApplications();
  }

  private getPendingApplications() {
    this.applicationService.getPendingApplications().subscribe(result => {
      this.pendingApplications = result;
    });
  }

  openProfileModal(template: TemplateRef<any>, userEmail: string) {
    this.userService.getUserInformationByEmail(userEmail).subscribe(result => {
      this.internDetails = result 
    })
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openAcceptModal(template: TemplateRef<any>, applicationTrackingNumber: string) {
    this.initForm();
    this.applicationTrackingNumber = applicationTrackingNumber;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  openRejectModal(template: TemplateRef<any>, applicationTrackingNumber: string) {
    this.initForm();
    this.applicationTrackingNumber = applicationTrackingNumber;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  applicationResponse(isAccepted: boolean): void {

    let responseStatus = isAccepted ? ApplicationStatus.ACCEPTED : ApplicationStatus.REJECTED;

    let applicationResponse: ApplicationResponse = {
      trackingNumber: this.applicationTrackingNumber,
      responseNotes: this.applicationResponseForm.get('responseNotes').value,
      status: responseStatus
    }

    this.applicationService.updateApplication(applicationResponse).subscribe(() => {
      this.toastr.success('Application response sent');
      this.getPendingApplications();
    }, () => {
      this.toastr.error('Something went wrong');
    }).add(() => {
      this.modalRef.hide();
    });
  }

  initForm(): void {
    this.applicationResponseForm = new FormGroup({
      responseNotes: new FormControl('', [
        Validators.required
      ])
    });
  }
}
