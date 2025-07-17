

import { Router } from "express";
import Razorpay from "razorpay";
import { verifyAccessToken } from "../middlewares/auth.middleware";

import { PaymentRepository } from "../repositories/implementation/payment.repositories";
import { PaymentService } from "../services/implementation/payment.services";
import { PaymentController } from "../controllers/implementation/payment.controller";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";

const router = Router();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

// Instantiate repo → service → controller
const paymentRepository = new PaymentRepository();
const appointmentRepository = new AppointmentRepository();
const paymentService = new PaymentService(paymentRepository, razorpayInstance, appointmentRepository);
const paymentController = new PaymentController(paymentService);

// Protect routes
router.use(verifyAccessToken);

// Routes
router.post("/create-order", paymentController.createRazorpayOrder.bind(paymentController));
router.post("/verify", paymentController.verifyPaymentSignature.bind(paymentController));

export default router;
