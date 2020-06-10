import { UserDetails } from '../user/user-details';

export interface Internship {
    trackingNumber:string;
    title: string;
    description: string;
    startDate: Date;
    maxNumberOfStudents: number;
    salary: string;
    user?: UserDetails;
}
