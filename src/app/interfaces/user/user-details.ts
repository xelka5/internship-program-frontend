import { UserAccount } from './user-account';

export interface UserDetails {
    account: UserAccount,
    role: string,
    userDetails: any,
    status?: string,
    userAllowed?: boolean,
    userStatus?: string
}
