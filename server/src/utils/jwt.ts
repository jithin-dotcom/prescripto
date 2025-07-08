import jwt from "jsonwebtoken";
import env from '../config/env.config';

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload,env.JWT_ACCESS_SECRET!, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload,env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  return { accessToken,refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET!)
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET!);
};