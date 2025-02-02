import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthcareService {
  private apiUrl = 'http://localhost:5256/api/auth/'; // Adjust based on your backend API

  constructor(private http: HttpClient) { }

  // Fetch professionals based on the illness selected
  getProfessionalsByIllness(illnessId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professionals/${illnessId}`);
  }

  // Submit symptoms report
  submitSymptoms(symptoms: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/symptoms/report`, symptoms);
  }

  // Fetch recommendations
  getRecommendations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommendations/${patientId}`);
  }

  // Submit recommendation completion status
  submitRecommendationStatus(recommendationId: string, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/recommendations/${recommendationId}`, { completed: status });
  }
}
