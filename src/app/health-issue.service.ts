// health-issue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthIssueService {
  private apiUrl = 'http://localhost:5256/api/Illness'; 

  constructor(private http: HttpClient) {}

  submitHealthIssue(formData: any): Observable<any> {
    const illnessData = {
      name: formData.title,  // Name as required by the backend DTO
      description: formData.description  // Description as required by the backend DTO
    };
  
    // Send illness data as JSON to the backend
    return this.http.post(this.apiUrl, illnessData);
  }
}
