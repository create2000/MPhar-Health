import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Adjust the import path if needed
import { Observable } from 'rxjs'; // Import Observable

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false,
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm!: FormGroup; // Use definite assignment assertion (!)
    isLoading = false;
    errorMessage = '';
    isAdminLogin = false; // Flag for admin login

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

            const loginPayload = this.loginForm.value; // Use directly

            console.log('Sending login request with:', loginPayload);

            let authObservable: Observable<any>; // Type the variable

            if (this.isAdminLogin) {
                authObservable = this.authService.loginAdmin(loginPayload);
            } else {
                authObservable = this.authService.login(loginPayload);
            }

            authObservable.subscribe({  // Subscribe to the correct observable
                next: (response) => { // Add response parameter
                    console.log("Login Response:", response); // Log the response
                    this.authService.redirectUser();
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