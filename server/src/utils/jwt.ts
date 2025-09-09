import jwt from "jsonwebtoken";
import env from '../config/env.config';

export const generateTokens = (payload: object) => {

  const accessExpiry = env.JWT_ACCESS_EXPIRES;   
  const refreshExpiry = env.JWT_REFRESH_EXPIRES; 
  const accessToken = jwt.sign(payload,env.JWT_ACCESS_SECRET!, { expiresIn: accessExpiry as jwt.SignOptions["expiresIn"]});
  const refreshToken = jwt.sign(payload,env.JWT_REFRESH_SECRET!, { expiresIn: refreshExpiry as jwt.SignOptions["expiresIn"]});
  return { accessToken,refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET!)
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET!);
};