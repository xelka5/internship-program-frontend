import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Currency, InternshipType, DurationUnit } from 'src/app/shared/enums';
import { InternshipStatus } from 'src/app/shared/enums/internship-status';

@Component({
  selector: 'app-list-internships',
  templateUrl: './list-internships.component.html',
  styleUrls: ['./list-internships.component.scss']
})
export class ListInternshipsComponent implements OnInit {

  internships: Internship[];
  internshipTrackingNumber: string;
  internshipForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getActiveInternships();
  }

  openEditModal(template: TemplateRef<any>, trackingNumber: string): void {
    this.initEditForm();

    this.internshipService.getInternshipByTrackingNumber(trackingNumber).subscribe(result => {
      this.internshipForm.patchValue(result);
    })

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openDeleteModal(template: TemplateRef<any>, trackingNumber: string): void {
    this.internshipTrackingNumber = trackingNumber;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openFinishModal(template: TemplateRef<any>, trackingNumber: string): void {
    this.internshipTrackingNumber = trackingNumber;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  getActiveInternships(): void {
    this.internshipService.getEmployerInternshipsByStatus('ACTIVE').subscribe(result => {
      this.internships = result;
    });
  }

  editInternship(): void {
    this.internshipService.editInternship(this.internshipForm.value).subscribe(result => {
      this.toastr.success('Internship program edited');
      this.getActiveInternships();
      this.modalRef.hide();
    });
  }

  deleteInternship(): void {
    this.internshipService.deleteInternship(this.internshipTrackingNumber).subscribe(result => {
      this.toastr.success('Internship program deleted');
      this.getActiveInternships();
      this.modalRef.hide();
    });
  }

  finishInternship(): void {
    this.internshipService.finishInternship({ trackingNumber: this.internshipTrackingNumber}).subscribe(result => {
      this.toastr.success('Internship program finished');
      this.getActiveInternships();
      this.modalRef.hide();
    })
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.internshipForm.valid;
  }

  private initEditForm() {
    this.internshipForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      maxNumberOfStudents: new FormControl('', [
        Validators.required
      ]),
      startDate: new FormControl('', [
        Validators.required
      ]),
      duration: new FormControl('', [
        Validators.required
      ]),
      durationUnit: new FormControl(DurationUnit.WEEK, [
        Validators.required
      ]),
      type: new FormControl(InternshipType.PAID, [
        Validators.required
      ]),
      salary: new FormControl('0', [
        Validators.required
      ]),
      currency: new FormControl(Currency.BGN, [
        Validators.required
      ]),
      status: new FormControl(InternshipStatus.ACTIVE, [
        Validators.required
      ]),
      trackingNumber: new FormControl('')
    });
  }
}
