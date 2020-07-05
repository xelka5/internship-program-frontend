import { Component, OnInit, TemplateRef } from '@angular/core';
import { FinalReport } from 'src/app/interfaces/report/final-report';
import { FinalReportService } from 'src/app/services/api/final-report/final-report.service';
import { InternshipFinalReports } from 'src/app/interfaces/report/internship-final-reports';
import { environment } from 'src/environments/environment';
import { UrlService } from 'src/app/services/core/url/url.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-final-reports',
  templateUrl: './final-reports.component.html',
  styleUrls: ['./final-reports.component.scss']
})
export class FinalReportsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  modalRef: BsModalRef;

  internshipFinalReports: InternshipFinalReports;
  internshipTrackingNumber: string;
  applicationTrackingNumber: string;

  finalReportForm: FormGroup;
  finalReportFile: File;

  constructor(private finalReportService: FinalReportService, private urlService: UrlService,
    private router: Router, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.internshipTrackingNumber = this.urlService.getTrackingNumberFromUrl(this.router.url);
    this.fetchInternshipFinalReports();
  }

  openCreateFinalReportModal(template: TemplateRef<any>, applicationTrackingNumber: string): void {
    this.applicationTrackingNumber = applicationTrackingNumber;
    this.initFinalReportForm();

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  createFinalReport(): void {
    this.finalReportService.createFinalReportEmployer(Object.assign({}, this.finalReportForm.value, { applicationTrackingNumber: this.applicationTrackingNumber }))
      .pipe(
        switchMap(result => {
          return this.finalReportService.uploadReportFile(this.finalReportFile, result.reportTrackingNumber);
        })
      ).subscribe(result => {
        this.toastr.success('Final report created');
        this.fetchInternshipFinalReports();
        this.modalRef.hide();
      });
  }

  onFileChanged(event): void {
    let supportedExtensions = [ 'doc', 'docx', 'pdf'];

    if(!supportedExtensions.includes(event.target.files[0].name.split('.').pop())) {
      this.toastr.warning('Please upload an doc, docx or pdf file');
      return;
    }
    
    this.finalReportFile = event.target.files[0];
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.finalReportForm.valid && this.finalReportFile !== undefined;
  }

  private fetchInternshipFinalReports() {
    this.finalReportService.getAllInternshipFinalReports(this.internshipTrackingNumber).subscribe(result => {
      this.internshipFinalReports = result;
    });
  }

  private initFinalReportForm(): void {
    this.finalReportForm = new FormGroup({
      reportNotes: new FormControl('', [
        Validators.required
      ])
    });
  }

}
