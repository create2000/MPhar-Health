import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Make sure to import AuthService

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: false,
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the username from the auth service
    this.userName = this.authService.getUserName();
  }
}
