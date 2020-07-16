/**
 * Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RoutingModule } from './modules/routing.module';
import { JwtModule } from "@auth0/angular-jwt";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxModule } from './modules/ngx.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SiteHeaderComponent } from './components/shared/site-header/site-header.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AddInternshipComponent } from './components/add-internship/add-internship.component';
import { ListInternshipsComponent } from './components/list-internships/list-internships.component';
import { SearchInternshipsComponent } from './components/search-internships/search-internships.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';
import { PendingApplicationsComponent } from './components/pending-applications/pending-applications.component';
import { ActiveInternshipsComponent } from './components/active-internships/active-internships.component';
import { PendingApprovalsComponent } from './components/pending-approvals/pending-approvals.component';
import { AllInternshipsComponent } from './components/all-internships/all-internships.component';
import { PendingInfoComponent } from './components/pending-info/pending-info.component';
import { FinishedInternshipsEmployerComponent } from './components/finished-internships-employer/finished-internships-employer.component';
import { FinishedInternshipsInternComponent } from './components/finished-internships-intern/finished-internships-intern.component';
import { FinishedInternshipsAdminComponent } from './components/finished-internships-admin/finished-internships-admin.component';
import { FinalReportsComponent } from './components/final-reports/final-reports.component';
import { AssignedInternsComponent } from './components/assigned-interns/assigned-interns.component';
import { BlockedInfoComponent } from './components/blocked-info/blocked-info.component';
import { FinalReportsReviewComponent } from './components/final-reports-review/final-reports-review.component';

/**
 * Providers
 */
import { tokenInterceptorProvider } from './services/core/interceptors/token-interceptor';

/**
 * Configuration
 */
import { jwtModuleConfig } from './services/core/auth';
import { RegistrationConfirmComponent } from './components/registration-confirm/registration-confirm.component';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    SidebarComponent,
    SiteHeaderComponent,
    AccountSettingsComponent,
    AddInternshipComponent,
    ListInternshipsComponent,
    SearchInternshipsComponent,
    MyApplicationsComponent,
    PendingApplicationsComponent,
    ActiveInternshipsComponent,
    PendingApprovalsComponent,
    AllInternshipsComponent,
    PendingInfoComponent,
    FinishedInternshipsEmployerComponent,
    FinishedInternshipsInternComponent,
    FinishedInternshipsAdminComponent,
    FinalReportsComponent,
    AssignedInternsComponent,
    BlockedInfoComponent,
    FinalReportsReviewComponent,
    RegistrationConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot(jwtModuleConfig),
    NgxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: TranslationLoaderFactory, 
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    tokenInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
