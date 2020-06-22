import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { ToastrService } from 'ngx-toastr';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { Application } from 'src/app/interfaces/application/application';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-internships',
  templateUrl: './search-internships.component.html',
  styleUrls: ['./search-internships.component.scss']
})
export class SearchInternshipsComponent implements OnInit {

  internships: Internship[];
  apiUrl: string = environment.apiUrl;

  modalRef: BsModalRef;
  applicationForm: FormGroup;
  internshipTrackingNumber: string;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, 
    private toastr: ToastrService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.getAllInternships();
  }

  getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(result => {
      this.internships = result;
    });
  }

  applyForInternship(): void {

    let addApplicationRequest: Application = {
      details: this.applicationForm.get('details').value,
      status: 'PENDING',
      internship: {
        trackingNumber: this.internshipTrackingNumber
      }
    }

    this.applicationService.addNewApplication(addApplicationRequest).subscribe(() => {
      this.toastr.success('Application sent');
    }, err => {
      this.toastr.warning('User has already applied for this internship');
    }).add(() => {
      this.modalRef.hide();
    });
  }

  openModal(template: TemplateRef<any>, trackingNumber: string) {
    this.initApplicationForm();
    this.internshipTrackingNumber = trackingNumber;

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.applicationForm.valid;
  }

  private initApplicationForm() {
    this.applicationForm = new FormGroup({
      details: new FormControl('', [
        Validators.required
      ])
    });
  }

}
