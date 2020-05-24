import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/api/login/login.service';
import { AuthService } from 'src/app/services/core/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GRANT_TYPE_PASSWORD } from 'src/app/shared/constants/global-constants';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(): void {
    this.loginService.performLogin(this.createRequestBody()).subscribe(response => {
      this.authService.storeToken(response);
      this.router.navigateByUrl('/dashboard');
    });
  }

  createRequestBody(): HttpParams {
    let params = new HttpParams();

    Object.keys(this.loginForm.controls).forEach(key => {
      params = params.append(key, this.loginForm.get(key).value);
    });
    params = params.append('grant_type', GRANT_TYPE_PASSWORD);

    return params;
  }

}
