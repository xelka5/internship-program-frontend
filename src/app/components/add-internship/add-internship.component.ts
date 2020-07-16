import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { ToastrService } from 'ngx-toastr';
import { Currency, InternshipType, DurationUnit } from 'src/app/shared/enums';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html',
  styleUrls: ['./add-internship.component.scss']
})
export class AddInternshipComponent implements OnInit {

  internshipForm: FormGroup;

  constructor(private internshipService: InternshipService, private toastr: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
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
      startDate: new FormControl(null, [
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
      ])
    });
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkFormValid(): boolean {
    return this.internshipForm.valid;
  }

  addInternship(): void {
    this.internshipService.addNewInternship(this.internshipForm.value).pipe(
      switchMap(result => {
        return this.translateService.get('TOASTR.INTERNSHIP_ADDED');
      })
    )
    .subscribe(result => {
      this.toastr.success(result);
    }).add(() => this.internshipForm.reset());
  }

}
