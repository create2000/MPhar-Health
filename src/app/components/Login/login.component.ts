import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatErrorModule } from '@angular/material/error';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import for forms
import { CommonModule } from '@angular/common'; // Import for *ngIf

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatErrorModule,
    FormsModule, // Add FormsModule
    ReactiveFormsModule, // Add ReactiveFormsModule
    CommonModule // Add CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginPayload = {
        username: this.loginForm.value.username,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      console.log('Sending login request with:', loginPayload);

      this.authService.login(loginPayload).subscribe({
        next: () => {
          const role = this.authService.getUserRole();
          this.authService.redirectUser(role); // Call redirectUser from AuthService
        },
        error: (err) => {
          this.errorMessage = `Login failed! ${err.error?.message || 'Invalid credentials'}`;
          console.error('Login error:', err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}