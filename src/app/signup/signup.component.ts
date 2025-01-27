import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form group and assign the custom validator
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch }); // Use `validators` key here
  }

  // Custom validator for password match
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      // Send data to the backend
      this.http.post('http://localhost:5256/api/auth/signup', {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: 'User' // Default role
      }).subscribe({
        next: (response: any) => {
          alert('Signup successful!');
          this.router.navigate(['/login']); // Redirect to login page
        },
        error: (err) => {
          if (err.status === 409) {
            alert('Email or username already exists!');
          } else {
            alert('Signup failed. Please try again.');
          }
          console.error(err);
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
