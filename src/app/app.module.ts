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
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';

/**
 * Providers
 */
import { tokenInterceptorProvider } from './services/core/interceptors/token-interceptor';

/**
 * Configuration
 */
import { jwtModuleConfig } from './services/core/auth';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    SiteHeaderComponent
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
