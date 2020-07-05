import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FinalReportService } from 'src/app/services/api/final-report/final-report.service';
import { switchMap } from 'rxjs/operators';
import { FinalReport } from 'src/app/interfaces/report/final-report';

@Component({
  selector: 'app-finished-internships-intern',
  templateUrl: './finished-internships-intern.component.html',
  styleUrls: ['./finished-internships-intern.component.scss']
})
export class FinishedInternshipsInternComponent implements OnInit {
  
  apiUrl: string = environment.apiUrl;

  modalRef: BsModalRef;

  internships: Internship[];
  internshipTrackingNumber: string;
  finalReport: FinalReport;

  finalReportForm: FormGroup;
  finalReportFile: File;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, 
    private toastr: ToastrService, private finalReportService: FinalReportService) { }

  ngOnInit(): void {
    this.getFinishedInternships();
  }

  getFinishedInternships(): void {
    this.internshipService.getAssignedInternInternshipsByStatus('FINISHED').subscribe(result => {
      this.internships = result;
    });
  }

  openCreateFinalReportModal(template: TemplateRef<any>, internshipTrackingNumber: string): void {
    this.internshipTrackingNumber = internshipTrackingNumber;
    this.initFinalReportForm();

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openShowFinalReportModal(template: TemplateRef<any>, internshipTrackingNumber: string): void {
    this.internshipTrackingNumber = internshipTrackingNumber;
    
    this.finalReportService.getInternFinalReportByInternship(internshipTrackingNumber).subscribe(result => {
      this.finalReport = result;
      console.log(this.finalReport);
    });

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  createFinalReport(): void {
    this.finalReportService.createFinalReportIntern(Object.assign({}, this.finalReportForm.value, { internshipTrackingNumber: this.internshipTrackingNumber }))
      .pipe(
        switchMap(result => {
          return this.finalReportService.uploadReportFile(this.finalReportFile, result.reportTrackingNumber);
        })
      ).subscribe(result => {
        this.toastr.success('Final report created');
        this.getFinishedInternships();
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

  getDurationLabel(duration: number, durationUnit: string): string {
    if(duration === 1) {
      return duration + ' ' + durationUnit.toLocaleLowerCase();
    }

    return duration + ' ' + durationUnit.toLocaleLowerCase() + 's';
  }

  private initFinalReportForm(): void {
    this.finalReportForm = new FormGroup({
      reportNotes: new FormControl('', [
        Validators.required
      ])
    });
  }

}
