

import { SignupRequestDTO, SignupData } from "./IAuthService";

export const mapSignupRequestToData = (
  dto: SignupRequestDTO,
  hashedPassword: string
): SignupData => ({
  name: dto.name,
  email: dto.email,
  password: hashedPassword,
  role: dto.role,
  isBlocked: false,
});
