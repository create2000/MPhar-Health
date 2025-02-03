export interface HealthIssue {
    id: number;
    patientId: number;
    description: string;
    submissionDate: Date;
    assignedHealthProfessionalId?: number;
    recommendation?: string;
    recommendationDate?: Date;
    patient?: any; // Add this if you want to display patient information
    assignedHealthProfessional?: any; // and this for health professional info
  }