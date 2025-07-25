

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from "cookie-parser";
import passport from "passport";
import env from './config/env.config';
import connectDB from './config/db.config';

import authRoutes from "./routes/auth.routes";
import patientProfileRoutes from "./routes/patientProfile.routes";
import doctorProfileRoutes from "./routes/doctorProfile.routes";
import adminRouter from "./routes/admin.routes";
import userRouter from "./routes/user.routes";
import paymentRouter from "./routes/payment.routes";
import cloudinaryRoutes from "./routes/coudinary.routes";
import appointmentRouter from "./routes/appointment.routes";
import chatRouter from "./routes/chat.routes";

import { requestLogger } from './middlewares/requestLogger.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { socketAuthMiddleware } from './middlewares/socketAuth.middleware';
import { chatSocketHandler } from './utils/sockets/chat.socket';
import { videoCallSocketHandler } from './utils/sockets/videoCall.socket';

const app = express();
const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3002", "http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  },
});


const chatNamespace = io.of("/chat");
chatNamespace.use(socketAuthMiddleware); 
chatNamespace.on("connection", (socket) => {
  console.log(`Chat socket connected: ${socket.id}`);
  chatSocketHandler(chatNamespace, socket);
});


const videoNamespace = io.of("/video");
videoNamespace.on("connection", (socket) => {
  console.log(` Video socket connected: ${socket.id}`);
  videoCallSocketHandler(videoNamespace, socket);
});


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3002", "http://localhost:3001", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(requestLogger);



app.use("/api/auth", authRoutes);
app.use("/api/patient", patientProfileRoutes);
app.use("/api/doctor", doctorProfileRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api", cloudinaryRoutes);
app.use("/api", appointmentRouter);
app.use("/api/payments", paymentRouter);
app.use("/api",chatRouter);


app.use(errorHandler);


const PORT = env.PORT || 8000;
connectDB();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

