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
import { ApplicationDetails } from 'src/app/interfaces/application/application-details';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.scss']
})
export class PendingApplicationsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  pendingApplications: ApplicationDetails[];
  internDetails: UserDetails;

  modalRef: BsModalRef;

  applicationResponseForm: FormGroup;
  applicationTrackingNumber: string;

  constructor(private applicationService: ApplicationService, private modalService: BsModalService,
    private userService: UserService, private toastr: ToastrService, private translateService: TranslateService) { }

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
    });
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

    this.applicationService.updateApplication(applicationResponse).pipe(
      switchMap(result => {
        return this.translateService.get('TOASTR.APPLICATION_RESPONSE_SENT')
      })
    ).subscribe(result => {
      this.toastr.success(result);
      this.getPendingApplications();
    }).add(() => {
      this.modalRef.hide();
    });
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.applicationResponseForm.valid;
  }


  initForm(): void {
    this.applicationResponseForm = new FormGroup({
      responseNotes: new FormControl('', [
        Validators.required
      ])
    });
  }
}
