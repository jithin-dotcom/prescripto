
// import { OAuth2Client } from "google-auth-library";
// import { UserRepository } from "../../repositories/implementation/user.repositories";
// import { generateTokens } from "../../utils/jwt";
// import { IUser } from "../../types/user.type";

// export class GoogleAuthService {
//   private client: OAuth2Client;

//   constructor(private userRepo: UserRepository) {
//     this.client = new OAuth2Client(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );
//   }

//   getGoogleAuthURL(): string {
//     const url = this.client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["profile", "email"],
//       prompt: "consent",
//     });

//     return url;
//   }

//   async handleGoogleCallback(code: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
//     const { tokens } = await this.client.getToken(code);
//     const ticket = await this.client.verifyIdToken({
//       idToken: tokens.id_token!,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload || !payload.email) throw new Error("Invalid Google user");

//     // Check if user already exists
//     let user = await this.userRepo.findByEmail(payload.email);

//     if (!user) {
//       // Create new user
//       const newUser: IUser = {
//         name: payload.name || "Google User",
//         email: payload.email,
//         password: "", // not needed for Google
//         role: "user",
//       };

//       user = await this.userRepo.createUser(newUser);
//         //  const userDoc = await this.userRepo.createUser(newUser);
//         //  const user = userDoc.toObject(); // Convert Mongoose Document to plain object
//     }

//     const { accessToken, refreshToken } = generateTokens({
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     });

//     return { user, accessToken, refreshToken };
//   }
// }
