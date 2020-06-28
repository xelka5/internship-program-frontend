import { UserDetails } from '../user/user-details';
import { EmployerDetails } from '../application/employer-details';

export interface Internship {
    trackingNumber:string;
    title: string;
    description: string;
    startDate: Date;
    duration: number,
    durationUnit: string,
    maxNumberOfStudents: number;
    type: string
    salary?: string;
    currency?: string;
    employer?: EmployerDetails;
}
