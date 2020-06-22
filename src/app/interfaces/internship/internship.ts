import { UserDetails } from '../user/user-details';
import { EmployerDetails } from '../application/employer-details';

export interface Internship {
    trackingNumber:string;
    title: string;
    description: string;
    startDate: Date;
    maxNumberOfStudents: number;
    salary: string;
    employer?: EmployerDetails;
}
