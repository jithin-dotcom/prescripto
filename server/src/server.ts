

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
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import paymentRoutes from "./routes/payment.routes";
import cloudinaryRoutes from "./routes/coudinary.routes";
import appointmentRoutes from "./routes/appointment.routes";
import chatRoutes from "./routes/chat.routes";
import walletRoutes from "./routes/wallet.routes";
import doctorRatingRoutes from "./routes/doctorRating.routes";
import prescriptionRoutes from "./routes/prescription.routes";
import concernRoutes from "./routes/concern.routes";

import { requestLogger } from './middlewares/requestLogger.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { socketAuthMiddleware } from './middlewares/socketAuth.middleware';
import { chatSocketHandler } from './utils/sockets/chat.socket';
import { videoCallSocketHandler } from './utils/sockets/videoCall.socket';
import { notFound } from './middlewares/notFound.middleware';

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
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", chatRoutes);
app.use("/api", walletRoutes);
app.use("/api", doctorRatingRoutes);
app.use("/api", prescriptionRoutes);
app.use("/api", concernRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = env.PORT || 8000;
connectDB();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

