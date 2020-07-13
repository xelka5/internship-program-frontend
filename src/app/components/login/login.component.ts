import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from 'src/app/services/api/login/login.service';
import { AuthService } from 'src/app/services/core/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GRANT_TYPE_PASSWORD } from 'src/app/shared/constants/global-constants';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/interfaces/login/login-response';
import { UserService } from 'src/app/services/api/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  requestPasswordResetForm: FormGroup;
  confirmPasswordResetForm: FormGroup;

  shouldResetPassword: boolean = false;

  modalRef: BsModalRef;

  constructor(private loginService: LoginService, private authService: AuthService, 
    private router: Router, private toastr: ToastrService, private userService: UserService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  openResetPasswordModal(template: TemplateRef<any>) {
    this.initRequestPasswordResetForm();
    this.initConfirmPasswordResetForm();

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  requestResetPassword(): void {
    this.userService.requestResetPassword(this.requestPasswordResetForm.value).subscribe(result => {
      this.shouldResetPassword = true;
      this.requestPasswordResetForm.get('userEmail').disable();
      this.toastr.success('Reset code sent as email');
    });
  }

  resetPassword(): void {
    if(this.passwordsNotMatching()) {
      this.toastr.warning('Password not confirmed. Try again.');
      this.confirmPasswordResetForm.get('newPassword').reset();
      this.confirmPasswordResetForm.get('passwordConfirm').reset();
      return;
    }

    let resetBody = Object.assign(this.confirmPasswordResetForm.value, this.requestPasswordResetForm.value);
    this.userService.confirmResetPassword(resetBody).subscribe(() => {
      this.toastr.success('Password changed, please login with the new password');
      this.modalRef.hide();
    })
  }

  login(): void {
    this.loginService.performLogin(this.createRequestBody()).subscribe(result => {
      this.handleSuccessLoginResponse(result);
    }, err => {
      this.toastr.warning('Wrong username or password!');
    });
  }

  /**
   * Make a call to user information service to see if user has rights to
   * login into the system. In case user still has some restrictions, clear 
   * user session and notify with appropriate message.
   * 
   * @param loginResponse - login response object containing user session details
   */
  private handleSuccessLoginResponse(loginResponse: LoginResponse) {
    this.authService.storeToken(loginResponse);

    this.userService.getUserInformation().subscribe(result => {
      if(result.userStatus === 'PENDING_CONFIRMATION') {
        this.toastr.warning('Please confrim your registration to continue');
        this.authService.clearTokenStorage();
      } else if(result.userStatus === 'BLOCKED') {
        this.toastr.warning('This account has been blocked by the administration');
        this.authService.clearTokenStorage();
      } else if(!result.userAllowed) {
        this.toastr.warning('Your account is waiting to be confirmed by the administration');
        this.authService.clearTokenStorage();
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  /**
   * Creating form parameters for user login
   */
  private createRequestBody(): HttpParams {
    let params = new HttpParams();

    Object.keys(this.loginForm.controls).forEach(key => {
      params = params.append(key, this.loginForm.get(key).value);
    });
    params = params.append('grant_type', GRANT_TYPE_PASSWORD);

    return params;
  }

  private passwordsNotMatching(): boolean { 
    let password = this.confirmPasswordResetForm.get('newPassword').value;
    let confirmPassword = this.confirmPasswordResetForm.get('passwordConfirm').value;

    return password !== confirmPassword;     
  }

  isInvalidFormControl(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && 
      (form.controls[control].dirty || form.controls[control].touched);
  }

  checkRequestPasswordResetFormValid(): boolean {
    return this.requestPasswordResetForm.valid;
  }

  checkConfirmPasswordResetFormValid(): boolean {
    return this.confirmPasswordResetForm.valid;
  }

  clearResetForms(): void {
    this.requestPasswordResetForm.reset();
    this.confirmPasswordResetForm.reset();
    this.shouldResetPassword = false;
    this.requestPasswordResetForm.get('userEmail').enable();
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  private initRequestPasswordResetForm(): void {
    this.requestPasswordResetForm = new FormGroup({
      userEmail: new FormControl({value: '', disabled: false}, [ 
        Validators.email, 
        Validators.required
      ])
    });
  }

  private initConfirmPasswordResetForm(): void {
    this.confirmPasswordResetForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      resetCode: new FormControl('', Validators.required)
    });
  }
}
