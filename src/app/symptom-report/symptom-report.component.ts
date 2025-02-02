import { Component } from '@angular/core';
import { HealthcareService } from '../healthcare.service';

@Component({
  selector: 'app-symptom-report',
  templateUrl: './symptom-report.component.html',
  standalone: false,
  styleUrls: ['./symptom-report.component.css']
})
export class SymptomReportComponent {
  symptoms = [
    { name: 'Headache', selected: false },
    { name: 'Fever', selected: false },
    // Add more symptoms here
  ];

  constructor(private healthcareService: HealthcareService) { }

  submitSymptoms() {
    const selectedSymptoms = this.symptoms.filter(symptom => symptom.selected);
    this.healthcareService.submitSymptoms(selectedSymptoms).subscribe(response => {
      console.log('Symptoms submitted successfully');
    });
  }
}
