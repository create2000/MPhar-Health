import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Illness {
  id: number;
  name: string;
}

interface Professional {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class HealthProfessionalsService {

  private apiUrl = 'http://localhost:5256/api/auth/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getIllnesses(): Observable<Illness[]> {
    return this.http.get<Illness[]>(`${this.apiUrl}/illnesses`); // Adjust to your actual endpoint
  }

  getProfessionalsByIllness(illnessId: number): Observable<Professional[]> {
    return this.http.get<Professional[]>(`${this.apiUrl}/professionals/${illnessId}`); // Adjust to your actual endpoint
  }
}
