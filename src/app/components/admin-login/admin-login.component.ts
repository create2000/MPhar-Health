import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  standalone: false,
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username = '';
  email    = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.loginAdmin(this.username, this.email, this.password).subscribe( // ✅ Add email
      (response) => {
        localStorage.setItem('admin_token', response.token); // Store token
        this.router.navigate(['/admin-dashboard']); // Redirect to Admin Dashboard
      },
      (error) => {
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }
  
}
