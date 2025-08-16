import {IUser} from '../../types/user.type'


export interface AuthResult {
  user: {
    name: string;
    email: string;
    role: string;
    password?:string|undefined;
  };
  accessToken: string;
  refreshToken: string;
}


export interface IAuthService{
     signup(user: IUser): Promise<object>; 
     login(email: string,password:string): Promise<{accessToken: string; refreshToken: string; user: any}>;
     verifyOtpAndRegister(email: string, otp: string): Promise<AuthResult>;
     resendOtp(email: string): Promise<object>;
     forgotPassword(email: string): Promise<object>;
     verifyForgotPasswordOtp(email: string, otp: string): Promise<{message: string}>;
     updateNewPassword(email: string, newPassword: string, reenterNewPassword: string): Promise<object>;
     googleAuth(userObj: any): Promise<{ user: any; accessToken: string; refreshToken: string}>
     loginWithGoogle(token: string): Promise<object>;
     refreshToken(refreshToken: string): Promise<{accessToken: string;refreshToken: string; user: any}>
     logout(refreshToken: string): Promise<void>;
     findUserById(userId: string): Promise<IUser | null>
}