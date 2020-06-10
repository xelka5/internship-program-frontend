import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../components/registration/registration.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../services/core/auth-guard/auth-guard.service'
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { AddInternshipComponent } from '../components/add-internship/add-internship.component';
import { ListInternshipsComponent } from '../components/list-internships/list-internships.component';
import { SearchInternshipsComponent } from '../components/search-internships/search-internships.component';


const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'add-internship', component: AddInternshipComponent },
      { path: 'my-internships', component: ListInternshipsComponent },
      { path: 'search-internships', component: SearchInternshipsComponent }
      
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
