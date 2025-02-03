import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';

interface User { 
  id: string;
  fullname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private loggedInUserIdSubject = new BehaviorSubject<string | null>(null);
  public loggedInUserId$ = this.loggedInUserIdSubject.asObservable();
  private userNameSubject = new BehaviorSubject<string | null>(null);
  public userName$ = this.userNameSubject.asObservable();
  private userDetails: any = null;

  private apiUrl = 'http://localhost:5256/api'; // Your API URL

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token && this.isValidToken(token)) {
      this.setLoggedInStatus(true);
      this.setUserName();
      this.setUserRole();
    }
  }

  login(credentials: any): Observable<any> {
    return this.authRequest(`${this.apiUrl}/auth/login`, credentials);
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.authRequest(`${this.apiUrl}/admin/login`, credentials);
  }

  private authRequest(url: string, credentials: any): Observable<any> {
    return this.http.post(url, credentials, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: any) => {
        this.handleLoginSuccess(response);
      }),
      catchError((error) => {
        console.error("Login error:", error);
        return of(null);
      })
    );
  }

  private handleLoginSuccess(response: any) {
    console.log("Full Login Response:", response); // Log the entire response

    if (response?.token?.result) { // Check nested structure
        const token = response.token.result;
        console.log("Token to store:", token);
        localStorage.setItem('token', token);
        this.setLoggedInStatus(true);
        this.setUserName();
        this.setUserRole();
        this.setLoggedInUserId(response.id);
        this.redirectUser();
    } else {
        console.error("Token not found in response:", response); // Log if token is missing
    }
}


  private setLoggedInUserId(userId: string) {
    this.loggedInUserIdSubject.next(userId);
    localStorage.setItem('userId', userId);
  }

  private isValidToken(token: string): boolean {
    return !!this.decodeToken(token);
  }

  private setLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  private setUserName() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      this.userNameSubject.next(decodedToken?.fullname || 'User'); // Adjust 'fullname' if needed
    }
  }

  private decodeToken(token: string): any { // Explicitly return 'any' or a decoded token interface
    try {
        if (!token) return null;

        const parts = token.split('.');

        if (parts.length !== 3) {
            console.error('Invalid token format:', token);
            return null;
        }

        const payload = JSON.parse(atob(parts[1]));
        return payload; // Return the payload directly
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
}


private setUserRole() {
  const token = localStorage.getItem('token');
  console.log("Token in setUserRole:", token); // Log the token
  if (token) {
      const decodedToken = this.decodeToken(token);
      console.log("Decoded Token:", decodedToken); // Log the decoded token
      const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decodedToken?.role || 'User';
      localStorage.setItem('userRole', role);
      console.log("User Role (after setting):", role); // Log the role after setting it
  } else {
      localStorage.removeItem('userRole');
      console.log("No token, userRole removed");
  }
}


  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUser(): Observable<User | null> { // Return User | null
    return this.userName$.pipe(
      map(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded: any = this.decodeToken(token);

          // *** KEY CHANGE: Create a User object ***
          if (decoded) {
            const role = decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded?.role || 'User';
            return { 
              id: decoded.id, 
              fullname: decoded.fullname || 'Unknown User', // Provide a default if fullname is missing
              role: role // Add the role property
            };
          }
        }
        return null;
      })
    );
  }

  logout() {
    ['token', 'userRole', 'userId', 'userDetails'].forEach(item => localStorage.removeItem(item));
    this.setLoggedInStatus(false);
    this.userNameSubject.next(null);
    this.loggedInUserIdSubject.next(null);
    this.router.navigate(['/login']);
  }

  redirectUser() {
    this.getUser().subscribe(user => { // Subscribe to the observable
      const role = user?.role;
      if (role === 'Health Professional') {
        this.router.navigate(['/health-dashboard']);
      } else if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (role === 'User') {
        this.router.navigate(['/Home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  public getUserDetails(): any {
    return JSON.parse(localStorage.getItem('userDetails') || '{}');
  }

  public setUserDetails(details: any): void {
    this.userDetails = details;
    localStorage.setItem('userDetails', JSON.stringify(details));
  }
}