import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-health-professional-dashboard',
  template: `
    <h2>Health Professional Dashboard</h2>
    <p>Welcome, {{ userName }}!</p>
    <p>This is the Health Professional dashboard.</p>
    `,
  standalone: false,
  styles: []
})
export class HealthProfessionalDashboardComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}