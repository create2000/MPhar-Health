
import { LoginComponent } from './app/components/Login/login.component';
import { DashboardComponent } from './app/components/Dashboard/dashboard.component';

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'dashboard', component: DashboardComponent }, // Dashboard page
  { path: '**', redirectTo: '' }, // Wildcard route (redirects to home)
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom(AppModule)]
};

