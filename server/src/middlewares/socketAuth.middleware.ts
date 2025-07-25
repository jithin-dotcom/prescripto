

import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "your jwt secret";

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;
  
  if (!token) {
    console.log("Authentication error: No token provided")
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log("user : ",user);
    socket.data.user = user; 
    next();
  } catch (err) {
    console.log("error in catch",err);
    next(new Error("Authentication error: Invalid token"));
  }
};
