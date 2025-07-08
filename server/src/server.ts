import express from 'express';
import authRoutes from "./routes/auth.routes";
import patientProfileRoutes from "./routes/patientProfile.routes";
import doctorProfileRoutes from "./routes/doctorProfile.routes";
import adminRouter from "./routes/admin.routes";
import userRouter from "./routes/user.routes";
import env from './config/env.config';
import connectDB  from './config/db.config';
import passport from "passport";
import cors from 'cors';
import cookieParser from "cookie-parser";
import cloudinaryRoutes from "./routes/coudinary.routes";
const app = express();
import { Request, Response, NextFunction } from 'express';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,              
}));



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(passport.initialize());
app.use(cookieParser());

app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/patient",patientProfileRoutes);
app.use("/api/doctor",doctorProfileRoutes);
app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);
app.use("/api", cloudinaryRoutes);


app.use(errorHandler);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   // console.error(" Global Error:", err);
//   logger.error(err);

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Something went wrong";

//   res.status(statusCode).json({ message });
// });

const PORT = env.PORT||8000;
connectDB();

app.listen(PORT,()=>{
    console.log(`server running at PORT : ${PORT}`);
})



