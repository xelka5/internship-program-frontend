import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/api/user/user.service';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { UserRole } from 'src/app/shared/enums/user-role';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  accountForm: FormGroup;
  internDetailsForm: FormGroup;
  employerDetailsForm: FormGroup;
  
  role: string;
  email: string;

  selectedProfileImage: File;
  previewUrl;

  INTERN: string = UserRole.INTERN;
  EMPLOYER: string =  UserRole.EMPLOYER;
  ADMIN: string = UserRole.ADMIN;

  constructor(private userService: UserService, private toastr: ToastrService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
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
    
    this.employerDetailsForm = new FormGroup({
      historyNotes: new FormControl('', [
        Validators.required
      ]),
      descriptionNotes: new FormControl('', [
        Validators.required
      ]),
      companyName: new FormControl('', [
        Validators.required
      ]), 
      numberOfWorkers: new FormControl('', [
        Validators.required
      ])
    });

    this.userService.getUserInformation().subscribe(result => this.handleSuccessFetchResult(result));
  }

  handleSuccessFetchResult(result: UserDetails): void {
    this.accountForm.patchValue(result.account);
    if(result.account.profileImageName) {
      this.previewUrl = `${environment.apiUrl}/` + result.account.profileImageName;
    }
    
    this.role = result.role;
    this.email = result.account.email;
    
    if(this.role === UserRole.INTERN) {
      this.internDetailsForm.patchValue(result.userDetails);
    } else if(this.role === UserRole.EMPLOYER) {
      this.employerDetailsForm.patchValue(result.userDetails);
    }
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkAllFormsValid(): boolean {
    let userDetailsValid: boolean;
    
    if(this.role === this.ADMIN) {
      return this.accountForm.get('username').valid;
    }
    
    if(this.role === this.INTERN) {
      userDetailsValid = this.internDetailsForm.valid;
    } else if(this.role === this.EMPLOYER) {
      userDetailsValid = this.employerDetailsForm.valid;
    }

    return this.accountForm.valid && userDetailsValid;
  }

  onFileChanged(event): void {

    if(!event.target.files[0].type.includes('image')) {
      this.translateService.get('TOASTR.UPLOAD_IMAGE').subscribe(result => {
        this.toastr.warning(result);
      })
      
      return;
    }

    this.selectedProfileImage = event.target.files[0];

    var reader = new FileReader();      
    reader.readAsDataURL(this.selectedProfileImage); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  editAccount(): void {
    let editAccountData: UserDetails = {
      account: this.accountForm.value,
      role: this.role,
      userDetails: null
    }

    editAccountData.account.email = this.email;

    if(this.role === this.INTERN) {
      editAccountData.userDetails = this.internDetailsForm.value;
    } else {
      editAccountData.userDetails = this.employerDetailsForm.value;
    }

    this.userService.editUserAccount(editAccountData)
    .pipe(
      switchMap(result => {
        if(this.selectedProfileImage) {
          return this.userService.uploadProfileImage(this.selectedProfileImage, result.email);
        }
        return of(result);
      })
    ).pipe(
      switchMap(result => {
        return this.translateService.get('TOASTR.SUCCESSFULLY_UPDATED_PROFILE')
      })
    ).subscribe(result => {
      this.toastr.success(result);
    })
  }

}
