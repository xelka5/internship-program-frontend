import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/api/registration/registration.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.scss']
})
export class RegistrationConfirmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private registrationService: RegistrationService, 
    private toastr: ToastrService, private router: Router, private translateService: TranslateService) { }

  ngOnInit(): void {
    let queryParams = this.route.snapshot.queryParamMap;

    this.registrationService.confirmRegistration({ userEmail: queryParams.get('userEmail'), token: queryParams.get('token') }).pipe(
      switchMap(result => {
        return this.translateService.get('TOASTR.REGISTRATION_CONFIRMED')
      })
    ).subscribe(result => {
      this.toastr.success('Registration confirmed, please login');
      this.router.navigateByUrl('/login');
    });
  }

}
