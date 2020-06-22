import { EmployerDetails } from './employer-details';

export interface InternshipDetails {
    trackingNumber: string;
    title: string;
    employer: EmployerDetails;
}
