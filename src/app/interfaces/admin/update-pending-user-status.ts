import { UserRole } from 'src/app/shared/enums';

export interface UpdatePendingUserStatus {
    userEmail: string,
    userAllowed: boolean
}
