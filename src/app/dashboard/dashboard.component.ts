import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
   imports: [CommonModule],
  template: `
    <div *ngIf="isLoggedIn">
      <h2>Welcome, {{ userName }}!</h2>
      <p>This is your dashboard content.</p>
    </div>
    <div *ngIf="!isLoggedIn">
      <p>Please login to view your dashboard</p>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.router.navigate(['/login']); // Redirect if not logged in
      }
    });

    this.authService.userName$.subscribe((userName) => {
      this.userName = userName;
    });
  }
}
