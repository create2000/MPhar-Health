import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import MatCheckboxModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SymptomReportComponent } from './symptom-report/symptom-report.component';
import { HealthProfessionalDashboardComponent } from './health-professional-dashboard/health-professional-dashboard.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { SignupComponent } from './signup/signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PatientListComponent,
    RecommendationComponent,
    SymptomReportComponent,
    HealthProfessionalDashboardComponent,
    RecommendationsComponent,
    AdminDashboardComponent,
    AdminLoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatOptionModule,
    MatListModule,
    MatSnackBarModule,
    RouterModule.forRoot([])
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]

})
export class AppModule { }
