export interface LoginResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    scope: string;
    expires_in: number;
}
