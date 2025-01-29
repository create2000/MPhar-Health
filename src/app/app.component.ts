import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isLoggedIn = false;
  menuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }}
