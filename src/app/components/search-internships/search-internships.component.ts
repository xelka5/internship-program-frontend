import { Component, OnInit, TemplateRef } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { ToastrService } from 'ngx-toastr';
import { Internship } from 'src/app/interfaces/internship/internship';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/api/application/application.service';
import { Application } from 'src/app/interfaces/application/application';
import { environment } from 'src/environments/environment';
import { InternshipStatus } from 'src/app/shared/enums/internship-status';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-internships',
  templateUrl: './search-internships.component.html',
  styleUrls: ['./search-internships.component.scss']
})
export class SearchInternshipsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  modalRef: BsModalRef;

  internshipTrackingNumber: string;
  internships: Internship[];
  
  applicationForm: FormGroup;

  searchTerm: string; 
  searchTermSubject: Subject<string> = new Subject<string>();

  constructor(private internshipService: InternshipService, private modalService: BsModalService, 
    private toastr: ToastrService, private applicationService: ApplicationService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getAllInternships();
    this.loadFilteredInternships();
  }

  getAllInternships(): void {
    this.internshipService.getAllInternshipsByStatus(InternshipStatus.ACTIVE).subscribe(result => {
      this.internships = result;
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  private loadFilteredInternships() {
    this.searchTermSubject.pipe(debounceTime(400), distinctUntilChanged(), 
    switchMap(searchTerm => this.internshipService.getFilteredActiveInternships(searchTerm)))
    .subscribe(result => {
      this.pageNumber = 1;
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

    this.applicationService.addNewApplication(addApplicationRequest).pipe(
      switchMap(result => {
        return this.translateService.get('TOASTR.APPLICATION_SENT')
      })
    ).subscribe((result) => {
      this.toastr.success(result);
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

  getDurationLabel(duration: number, durationUnit: string): string {
    if(duration === 1) {
      return duration + ' ' + durationUnit.toLocaleLowerCase();
    }

    return duration + ' ' + durationUnit.toLocaleLowerCase() + 's';
  }

  private initApplicationForm() {
    this.applicationForm = new FormGroup({
      details: new FormControl('', [
        Validators.required
      ])
    });
  }

}
