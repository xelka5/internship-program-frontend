import { UserAccount } from '../user/user-account';

export interface RegistrationRequest {
    account: UserAccount,
    role: string,
    userDetails: any
}
