
export interface IOtp {
    email: string,
    otp: string,
    user: {
        name: string,
        email: string,
        password: string,
        role: "user" | "doctor" | "admin";
        isBlocked: false;
    }
}