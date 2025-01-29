import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false; // Loading state for the login button

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading

      // Modify the login payload to include a "username" field
      const loginPayload = {
        username: "", // Since username is optional, send an empty string
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      console.log('Sending login request with:', loginPayload);
      
      this.authService.login(loginPayload).subscribe({
        next: (response: any) => {
          console.log('Login response:', response);

          if (response?.token) {
            localStorage.setItem('token', response.token); 
            this.authService.setLoggedInStatus(true); 
            this.authService.setUserName(); 
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Token is missing in the response');
            alert('Login failed! Please check your credentials and try again.');
          }
        },
        error: (err) => {
          console.error('Login error:', err); // Log the error for debugging
          alert(`Login failed! ${err.error?.message || 'Invalid credentials'}`);
        },
        complete: () => {
          this.isLoading = false; // Stop loading
        }
      });
    }
  }
}
