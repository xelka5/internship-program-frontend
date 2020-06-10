import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RegistrationService } from 'src/app/services/api/registration/registration.service';
import { UserRole } from 'src/app/shared/enums/user-role';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { RegistrationRequest } from 'src/app/interfaces/registration/registration-request';
import { Observable, of } from 'rxjs';
import { CheckEmailExistsResponse } from 'src/app/interfaces/check-email/check-email-exists-response';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  selectedProfileImage: File;
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

  constructor(private registrationService: RegistrationService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initForms();
  }

  nextStep(): void {
    if(this.step === 1) {
      if(this.passwordsNotMatching()) {
        this.toastr.warning('Password not confirmed. Try again.');
        this.accountForm.get('password').reset();
        this.accountForm.get('passwordConfirm').reset();
      }
      this.checkEmailAlreadyExists().subscribe(result => {
        if(result.emailExists) {
          this.toastr.warning('Given email is already registered');
          return;
        }

        if(this.isValidForm()) {
          this.step++;
        }
      });
    } else {
      if(this.isValidForm()) {
        this.step++;
      }
    }
  }

  previousStep(): void {
    this.step--;
  }

  passwordsNotMatching(): boolean { 
    let password = this.accountForm.get('password').value;
    let confirmPassword = this.accountForm.get('passwordConfirm').value;

    return password !== confirmPassword;     
  }

  submitRegistration(): void {
    let finalRegistrationData: RegistrationRequest = {
      account: this.accountForm.value,
      role: this.role,
      userDetails: null
    }

    if(this.role === this.INTERN) {
      finalRegistrationData.userDetails = 
        Object.assign(this.internForm.value, this.internDetailsForm.value);
    } else {
      finalRegistrationData.userDetails = 
        Object.assign(this.employerForm.value, this.employerDetailsForm.value);
    }

    this.registrationService.performRegistration(finalRegistrationData)
    .pipe(
      switchMap(result => {
        if(this.selectedProfileImage) {
          return this.registrationService.uploadProfileImage(this.selectedProfileImage, result.email);
        }
        return of(result);
      })
    )
    .subscribe(result => {
      this.toastr.success('Successful registration');
      this.router.navigateByUrl('/login');
    }, err => {
      this.toastr.error('Something went wrong, please try again');
      this.resetForms();
    });
  }

  checkEmailAlreadyExists(): Observable<CheckEmailExistsResponse> {
    return this.registrationService.checkIfEmailAlreadyExists({ emailToCheck: this.accountForm.get('email').value});
  }


  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  onFileChanged(event): void {

    if(!event.target.files[0].type.includes('image')) {
      this.toastr.warning('Please upload an image');
      return;
    }

    this.selectedProfileImage = event.target.files[0];

    var reader = new FileReader();      
    reader.readAsDataURL(this.selectedProfileImage); 
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
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
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

  resetForms(): void {
    this.accountForm.reset();
    this.employerForm.reset();
    this.internForm.reset();
    this.internDetailsForm.reset();
    this.employerDetailsForm.reset();
    this.selectedProfileImage = null;
    this.step = 1;
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
