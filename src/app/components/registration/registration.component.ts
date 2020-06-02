import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RegistrationService } from 'src/app/services/api/registration/registration.service';
import { UserRole } from 'src/app/shared/enums/user-role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  selectedFile: File;
  previewUrl;

  accountForm: FormGroup;
  role: string;
  internForm: FormGroup;
  employerForm: FormGroup;
  internDetailsForm: FormGroup;
  employerDetailsForm: FormGroup;

  step: number = 1;

  INTERN: string = UserRole.INTERN;
  EMPLOYER: string =  UserRole.EMPLOYER;

  constructor(private registrationService: RegistrationService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForms();
  }

  nextStep(): void {
    if(this.isValidForm()) {
      this.step++;
    }
  }

  previousStep(): void {
    this.step--;
  }

  submitRegistration(): void {
    let finalRegistrationData = {
      'account': this.accountForm.value,
      'role': this.role,
      'userDetails': null
    }

    if(this.role === this.INTERN) {
      finalRegistrationData.userDetails = 
        Object.assign(this.internForm.value, this.internDetailsForm.value);
    } else {
      finalRegistrationData.userDetails = 
        Object.assign(this.employerForm.value, this.employerDetailsForm.value);
    }

    this.registrationService.performRegistration(finalRegistrationData).subscribe(result => {
      this.toastr.success('Successful registration');
      this.router.navigateByUrl('/login');
    });
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];

    var reader = new FileReader();      
    reader.readAsDataURL(this.selectedFile); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  addNewSkill(): void {
    const skills = this.internDetailsForm.controls.skills as FormArray;
    if(skills.length > 4) {
      this.toastr.warning('You cannot add more than 5 skills!');
      return;
    }
    skills.push(new FormControl(''));
  }

  initForms(): void {
    this.accountForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl('')
    });

    this.internForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(16),
        Validators.max(65)
      ])
    });

    this.internDetailsForm = new FormGroup({
      university: new FormControl('', [
        Validators.required
      ]),
      course: new FormControl('', [
        Validators.required
      ]),
      startDate: new FormControl('', [
        Validators.required
      ]),
      previousEducation: new FormControl('', [
        Validators.required
      ]),
      skills: new FormArray([new FormControl(''), new FormControl(''), new FormControl('')])
    });

    this.employerForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required
      ]), 
      numberOfWorkers: new FormControl('', [
        Validators.required
      ])
    });
    
    this.employerDetailsForm = new FormGroup({
      historyNotes: new FormControl('', [
        Validators.required
      ]),
      descriptionNotes: new FormControl('', [
        Validators.required
      ])
    });
  }

  isValidForm(): boolean {
    switch(this.step) {
      case 1:
        return this.accountForm.valid;
      case 2:
        if(this.role === this.INTERN) {
          return this.internForm.valid;
        } else if(this.role === this.EMPLOYER) {
          return this.employerForm.valid;
        } else {
          return false;
        }
      case 3:
        if(this.role === this.INTERN) {
          return this.internDetailsForm.valid;
        } else {
          return this.employerDetailsForm.valid;
        }
      default:
        return false;
    }
  }
}
