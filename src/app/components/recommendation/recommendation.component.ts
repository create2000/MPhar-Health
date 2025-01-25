import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  standalone: false
  
})
export class RecommendationComponent implements OnInit {
  patientId: string | null = null;
  recommendations: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const MOCK_RECOMMENDATIONS = [
      { id: 1, patientId: 101, content: 'Annual checkup recommended', createdAt: '2025-01-15' },
      { id: 2, patientId: 101, content: 'Allergy screening advised', createdAt: '2025-01-10' },
      { id: 3, patientId: 102, content: 'Blood pressure monitoring', createdAt: '2025-01-20' },
    ];

    this.patientId = this.route.snapshot.paramMap.get('patientId');

    if (this.patientId) {
      this.http
        .get(`http://localhost:5000/api/recommendations/${this.patientId}`)
        .pipe(
          catchError((error) => {
            console.error('API request failed, using mock data', error);
            // Filter mock recommendations by patientId
            const fallbackData = MOCK_RECOMMENDATIONS.filter(
              (rec) => rec.patientId === Number(this.patientId)
            );
            return of(fallbackData); // Return mock data
          })
        )
        .subscribe((data: any) => {
          this.recommendations = data;
        });
    }
  }
}
