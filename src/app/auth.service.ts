import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private userNameSubject = new BehaviorSubject<string | null>(null);
  public userName$: Observable<string | null> = this.userNameSubject.asObservable();

  private apiUrl = 'http://localhost:5256/api'; // Or your API URL

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token') || localStorage.getItem('admin_token') || localStorage.getItem('health_professional_token'); // Check for all tokens
    if (token && this.isValidToken(token)) {
      this.setLoggedInStatus(true);
      this.setUserName();
      this.setUserRole();
    }
  }

  login(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}/auth/login`, JSON.stringify(credentials), { headers }).pipe(
      tap((response: any) => {
        console.log('Login successful, response:', response);
        localStorage.setItem('token', response.token); // Or localStorage.setItem('health_professional_token', response.token); if you have separate tokens
        this.setLoggedInStatus(true);
        this.setUserName();
        this.setUserRole();

        setTimeout(() => {
          const userRole = this.getUserRole();
          console.log('User role after login (with delay):', userRole);
          this.redirectUser(userRole);
        }, 0);
      }),
      catchError((error) => {
        console.error("Login error:", error);
        return of(null);
      })
    );
  }

  // ... (loginAdmin method - no changes needed)

  private isValidToken(token: string): boolean {
    return !!this.decodeToken(token);
  }

  setLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  setUserName() {
    const token = localStorage.getItem('token') || localStorage.getItem('admin_token') || localStorage.getItem('health_professional_token'); // Check all tokens
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      const fullName = decodedToken?.fullname || 'User';
      this.userNameSubject.next(fullName);
    }
  }

  decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  private setUserRole() {
    const token = localStorage.getItem('token') || localStorage.getItem('admin_token') || localStorage.getItem('health_professional_token'); // Check all tokens
    if (token) {
      const decodedToken: any = this.decodeToken(token);

      console.log("Decoded Token Claims (inside setUserRole):", decodedToken);

      const role = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken?.role || decodedToken?.Role || 'User'; // Check all possible keys
      console.log('Setting user role:', role);
      localStorage.setItem('userRole', role);
    }
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token') || localStorage.getItem('admin_token') || localStorage.getItem('health_professional_token'); // Check all tokens
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken?.role || decodedToken?.Role || null; // Check all possible keys, return null if no role is found
    }
    return null; // Return null if no token
  }

  // ... (isAdmin, isAuthenticated, getUserName, getUser, logout - no changes)

  public redirectUser(userRole: string | null) { // Make redirectUser public
    console.log("Redirecting user with role:", userRole);
    switch (userRole) {
      case 'Admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'Health Professional': // Correct case for Health Professional
        this.router.navigate(['/health-dashboard']);
        break;
      case 'User':
        this.router.navigate(['/Home']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}