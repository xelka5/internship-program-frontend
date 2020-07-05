import { InternProfile } from '../user/intern-profile';

export interface FinalReport {
    reportFileLocation: string,
    reportNotes: string,
    finalReportType: string,
    isReportPresent: boolean,
    internProfile?: InternProfile
}