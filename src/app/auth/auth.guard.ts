import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');

    console.log('Token:', token);

    if (token) {
        const userRole = this.authService.getUserRole();
        console.log('User Role:', userRole);

        if (userRole === 'Admin' || userRole === 'Health Professional' || userRole === 'User') {
            return true; // Allow access if the user has a valid role
        } else {
            this.router.navigate(['/login']); // Redirect to login for invalid roles
            return false;
        }
    } else {
        this.router.navigate(['/login']); // Redirect to login if no token
        return false;
    }
}
}
