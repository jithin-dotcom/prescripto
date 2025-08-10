

export const APIRoutes = {
   UPLOAD_PATIENT_PHOTO: "/patient/upload-photo", 
   TOP_DOCTORS: "/doctor/top-doctor-rating",
   ADMIN_CREATE_USERS: "/admin/create-users",
   CANCEL_APPOINTMENTS: "/cancel-appointment",
   USERS_COUNT: "/admin/users-count",
   ADMIN_GET_USERS: "/admin/users",
   ADMIN_BLOCK_TOGGLE: "/admin/block-toggle", 
   ADMIN_VERIFY_TOGGLE: "/admin/verify-toggle",
   ADMIN_GET_USER_EDIT: "/admin/get-user", 
   ADMIN_UPDATE_USERS: "/admin/update-user",
   ALL_CONCERNS: "/get-allConcerns",
   
} as const


export const APIUserRoutes = {
   CHANGE_EMAIL: "/user/change-email",
   CHANGE_PASSWORD: "/user/change-password",
   USER_PROFILE: "/user/user-profile",
   ALL_DOCTORS: "/user/all-doctors",
   CREATE_APPOINTMENTS: "/create-appointment",
   GET_ALL_APPOINTMENTS: "/all-createAppointments",
   UPDATE_USER: "/user/update-user",
   CREATE_USER: "/user/create-users",
   APPOINTMENTS: "/user-appointments",
   PAYMENT_CREATE_ORDER: "/payments/create-order",
   PAYMENT_VERIFY_ORDER: "/payments/verify",
   GET_WALLET: "/get-wallet",
} as const



export const APIAuthRoutes = {
   FORGOT_PASSWORD: "/api/auth/forgot-password",
   LOGIN: "/api/auth/login",
   GOOGLE_LOGIN: "/api/auth/google-login",
   UPDATE_PASSWORD: "/api/auth/update-password",
   SIGNUP: "/api/auth/signup",
   FORGOT_PASSWORD_OTP: "/api/auth/forgotPassword-otp",
   RESEND_OTP: "/api/auth/resend-otp",
   VERIFY_OTP: "/api/auth/verify-otp",
   AUTH_ME: "/auth/me",
   LOGOUT: "/api/auth/logout",
   REFRESH_TOKEN: "/api/auth/refresh-token",
} as const



export const APIChatRoutes = {
   GET_MESSAGES: "/messages",
   MY_CHATS: "/my-chats",
}


export const APIDoctorRoutes = {
   DOCTOR_APPOINTMENTS: "/doctor-appointments",
} as const