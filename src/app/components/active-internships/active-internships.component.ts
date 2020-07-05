import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Internship } from 'src/app/interfaces/internship/internship';
import { environment } from 'src/environments/environment';
import { ReportService } from 'src/app/services/api/report/report.service';
import { Report } from 'src/app/interfaces/report/report';
import { InternshipStatus } from 'src/app/shared/enums/internship-status';

@Component({
  selector: 'app-active-internships',
  templateUrl: './active-internships.component.html',
  styleUrls: ['./active-internships.component.scss']
})
export class ActiveInternshipsComponent implements OnInit {

  internships: Internship[];
  myReportsForInternship: Report[];
  selectedInternship: Internship;

  apiUrl: string = environment.apiUrl;

  modalRef: BsModalRef;
  
  reportForm: FormGroup;
  isEdit: boolean = false;

  internshipTrackingNumber: string;
  reportTrackingNumber: string;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, 
    private toastr: ToastrService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getActiveInternInternships();
  }

  getActiveInternInternships(): void {
    this.internshipService.getAssignedInternInternshipsByStatus(InternshipStatus.ACTIVE).subscribe(result => {
      this.internships = result;
    });
  }

  openInternshipDetailsModal(template: TemplateRef<any>, trackingNumber: string) {
    this.selectedInternship = this.internships.filter(internship => internship.trackingNumber === trackingNumber)[0];

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openReportModal(template: TemplateRef<any>, trackingNumber: string) {
    this.initReportForm();
    this.selectedInternship = this.internships.filter(internship => internship.trackingNumber === trackingNumber)[0];

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openMyReportsModal(template: TemplateRef<any>, trackingNumber: string) {
    this.selectedInternship = this.internships.filter(internship => internship.trackingNumber === trackingNumber)[0];

    this.fetchAllReportsForInternship(trackingNumber);

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openEditReportModal(template: TemplateRef<any>, reportTrackingNumber: string) {
    this.reportTrackingNumber = reportTrackingNumber;
    this.initReportForm();
    this.isEdit = true;

    this.reportService.getInternReport(reportTrackingNumber).subscribe(result => {
      this.reportForm.patchValue(result);
    })

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openDeleteReportModal(template: TemplateRef<any>, reportTrackingNumber: string) {
    this.reportTrackingNumber = reportTrackingNumber;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm mt-5'});
  }

  addNewReport(): void {
    let newReportData: Report = Object.assign(this.reportForm.value, { internshipTrackingNumber: this.selectedInternship.trackingNumber});
    
    this.reportService.addNewInternshipReport(newReportData).subscribe(result => {
      this.toastr.success('Added new report');
    })

    this.modalRef.hide();
  }

  deleteReport(): void {
    this.reportService.deleteReport(this.reportTrackingNumber).subscribe(result => {
      this.fetchAllReportsForInternship(this.selectedInternship.trackingNumber);
      this.toastr.success('Report deleted');
    });

    this.modalRef.hide();
  }

  editReport(): void {
    let updatedReportData: Report = Object.assign(this.reportForm.value, { internshipTrackingNumber: this.selectedInternship.trackingNumber});

    this.reportService.editReport(updatedReportData, this.reportTrackingNumber).subscribe(result => {
      this.fetchAllReportsForInternship(this.selectedInternship.trackingNumber);
      this.toastr.success('Report updated');
    })

    this.isEdit = false;
    this.modalRef.hide();
  }

  createNewReportRedirect(newTemplate: TemplateRef<any>) {
    this.modalRef.hide();
    this.initReportForm();
    
    this.modalRef = this.modalService.show(newTemplate, {class: 'modal-lg'});
  }

  private fetchAllReportsForInternship(trackingNumber: string): void {
    this.reportService.getAllInternshipsReports(trackingNumber).subscribe(result => {
      this.myReportsForInternship = result;
    }, () =>  {
      this.toastr.error('Something went wrong')
    });
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.reportForm.valid;
  }
  
  private initReportForm() {
    this.reportForm = new FormGroup({
      reportStartDate: new FormControl(null, Validators.required),
      reportEndDate: new FormControl(null, Validators.required),
      reportDetails: new FormControl('', Validators.required),
    })
  }

}
