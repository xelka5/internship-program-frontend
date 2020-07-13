export interface ConfirmResetPassword {
    userEmail: string,
    resetCode: string,
    newPassword: string
}