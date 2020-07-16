import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../components/registration/registration.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard, RoleGuardService as RoleGuard } from '../services/core/auth-guard'

import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { AddInternshipComponent } from '../components/add-internship/add-internship.component';
import { ListInternshipsComponent } from '../components/list-internships/list-internships.component';
import { SearchInternshipsComponent } from '../components/search-internships/search-internships.component';
import { UserRole } from '../shared/enums/user-role';
import { MyApplicationsComponent } from '../components/my-applications/my-applications.component';
import { PendingApplicationsComponent } from '../components/pending-applications/pending-applications.component';
import { ActiveInternshipsComponent } from '../components/active-internships/active-internships.component';
import { PendingApprovalsComponent } from '../components/pending-approvals/pending-approvals.component';
import { AllInternshipsComponent } from '../components/all-internships/all-internships.component';
import { PendingInfoComponent } from '../components/pending-info/pending-info.component';
import { FinishedInternshipsEmployerComponent } from '../components/finished-internships-employer/finished-internships-employer.component';
import { FinishedInternshipsInternComponent } from '../components/finished-internships-intern/finished-internships-intern.component';
import { FinishedInternshipsAdminComponent } from '../components/finished-internships-admin/finished-internships-admin.component';
import { FinalReportsComponent } from '../components/final-reports/final-reports.component';
import { AssignedInternsComponent } from '../components/assigned-interns/assigned-interns.component';
import { BlockedInfoComponent } from '../components/blocked-info/blocked-info.component';
import { FinalReportsReviewComponent } from '../components/final-reports-review/final-reports-review.component';
import { RegistrationConfirmComponent } from '../components/registration-confirm/registration-confirm.component';

/**
 * Routing through components represented in JSON object tree
 * Each route can have following parameters:
 *  @param path - url path for the route
 *  @param component - typescript component loaded on the route invocation
 *  @param canActivate - security mechanism for route activation
 *  @param data.expectedRoles - role guarding mechanism
 *  @param children - children routes specification
 */
const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration-confirm', component: RegistrationConfirmComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'add-internship', component: AddInternshipComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.EMPLOYER
        }
      },
      { path: 'my-internships', component: ListInternshipsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.EMPLOYER
        }
      },
      { path: 'pending-applications', component: PendingApplicationsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.EMPLOYER
        }
      },
      { path: 'finished-internships', component: FinishedInternshipsEmployerComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.EMPLOYER
        }
      },
      { path: 'final-reports/:internshipTrackingNumber', component: FinalReportsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: [ UserRole.EMPLOYER ]
        }
      },
      { path: 'assigned-interns/:internshipTrackingNumber', component: AssignedInternsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.EMPLOYER
        }
      },
      { path: 'search-internships', component: SearchInternshipsComponent, 
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: [UserRole.INTERN]
        }  
      },
      { path: 'my-applications', component: MyApplicationsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.INTERN
        }
      },
      {
        path: 'active-internships', component: ActiveInternshipsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.INTERN
        }
      },
      {
        path: 'finished-internships-notes', component: FinishedInternshipsInternComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.INTERN
        }
      },
      {
        path: 'all-internships', component: AllInternshipsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.ADMIN
        }
      },
      {
        path: 'finished-internships-review', component: FinishedInternshipsAdminComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.ADMIN
        }
      },
      { path: 'final-reports-review/:internshipTrackingNumber', component: FinalReportsReviewComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: [ UserRole.ADMIN ]
        }
      },
      {
        path: 'pending-approvals', component: PendingApprovalsComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.ADMIN
        }
      },
      {
        path: 'pending-info', component: PendingInfoComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.PENDING
        }
      },
      {
        path: 'blocked-info', component: BlockedInfoComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRoles: UserRole.BLOCKED
        }
      }
    ] 
  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**',   redirectTo: '/dashboard', canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
