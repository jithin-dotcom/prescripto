

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}