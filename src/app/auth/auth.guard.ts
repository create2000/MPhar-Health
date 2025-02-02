import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token') || localStorage.getItem('health_professional_token'); // Check all tokens

    console.log('Token:', token);

    if (token) {
      const userRole = this.authService.getUserRole();
      console.log('User Role:', userRole);

      if (userRole === 'Admin' || userRole === 'Health Professional' || userRole === 'User') { // Allow access for all valid roles
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}