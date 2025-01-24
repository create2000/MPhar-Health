import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5000/api/patients'; // API endpoint

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    const MOCK_PATIENTS = [
      { id: 1, name: 'John Doe', age: 30, condition: 'Diabetes' },
      { id: 2, name: 'Jane Smith', age: 45, condition: 'Hypertension' },
      { id: 3, name: 'Alice Johnson', age: 25, condition: 'Asthma' },
    ];

    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('API request failed, using mock data', error);
        return of(MOCK_PATIENTS); // Return mock data on API failure
      })
    );
  }
}
