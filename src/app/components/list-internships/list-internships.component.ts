import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-internships',
  templateUrl: './list-internships.component.html',
  styleUrls: ['./list-internships.component.scss']
})
export class ListInternshipsComponent implements OnInit {

  internships: Internship[];
  modalRef: BsModalRef;
  internshipForm: FormGroup;

  constructor(private internshipService: InternshipService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllInternships();
  }

  openModal(template: TemplateRef<any>, trackingNumber: string) {
    
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
      salary: new FormControl('', [
        Validators.required
      ]),
      trackingNumber: new FormControl('')
    });

    this.internshipService.getInternshipByTrackingNumber(trackingNumber).subscribe(result => {
      this.internshipForm.patchValue(result);
    })

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.internshipForm.valid;
  }

  getAllInternships(): void {
    this.internshipService.getAllInternshipsForEmployer().subscribe(result => {
      this.internships = result;
    });
  }

  editInternship(): void {
    this.internshipService.editInternship(this.internshipForm.value).subscribe(result => {
      this.toastr.success('Internship program edited');
      this.getAllInternships();
      this.modalRef.hide();
    });
  }

}
