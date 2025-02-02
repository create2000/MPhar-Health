import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { HealthProfessionalComponent } from './health-professionals/health-professionals.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HealthProfessionalDashboardComponent } from './health-professional-dashboard/health-professional-dashboard.component'; // Correct import path

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'health-dashboard', component: HealthProfessionalDashboardComponent, canActivate: [AuthGuard] }, // Health Professional route
  { path: 'recommendation', component: RecommendationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'Home' }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }