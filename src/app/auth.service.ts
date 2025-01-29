import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initial state
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private userNameSubject = new BehaviorSubject<string | null>(null);
  public userName$: Observable<string | null> = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check for token on app startup
    const token = localStorage.getItem('token');
    if (token && this.isValidToken(token)) { // ✅ Ensure token is valid
      this.setLoggedInStatus(true);
      this.setUserName();
    }
  } // ✅ Closing brace for the constructor

  // ✅ Moved outside the constructor
  private isValidToken(token: string): boolean {
    const decoded = this.decodeToken(token);
    return !!decoded;
  }

  // Create a public method to update login status
  setLoggedInStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  login(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://localhost:5256/api/auth/login', JSON.stringify(credentials), { headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.setLoggedInStatus(true); // Use the public method to set logged-in status
        this.setUserName(); // Set the user's name
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.setLoggedInStatus(false); // Use the public method to set logged-out status
    this.userNameSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setUserName() {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token
      const decodedToken: any = this.decodeToken(token);
      console.log("Decoded Token:", decodedToken); // 🔍 Debugging log
  
      const fullName = decodedToken?.fullname || 'User';
      console.log("Extracted fullname:", fullName); // 🔍 Debugging log
  
      this.userNameSubject.next(fullName); // Update UI
    } else {
      console.log("No token found in localStorage.");
    }
  }
  
  

  decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
