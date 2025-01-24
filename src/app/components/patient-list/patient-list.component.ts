import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    // Use the PatientService to fetch data
    this.patientService.getPatients().subscribe((data: any[]) => {
      this.patients = data; // Set the patients data to the component's variable
    });
  }
}
