"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const buffer_1 = require("buffer");
const paymentService_mapper_1 = require("../../utils/mapper/paymentService.mapper");
class PaymentService {
    constructor(_paymentRepo, _razorpayInstance, _appointmentRepo, _walletRepo, _walletHistoryRepo, _chatRepo, _payoutRepo) {
        this._paymentRepo = _paymentRepo;
        this._razorpayInstance = _razorpayInstance;
        this._appointmentRepo = _appointmentRepo;
        this._walletRepo = _walletRepo;
        this._walletHistoryRepo = _walletHistoryRepo;
        this._chatRepo = _chatRepo;
        this._payoutRepo = _payoutRepo;
    }
    createRazorpayOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountInPaise = data.amount * 100;
            const order = yield this._razorpayInstance.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });
            yield this._paymentRepo.create({
                appointmentId: new mongoose_1.default.Types.ObjectId(data.appointmentId),
                userId: new mongoose_1.default.Types.ObjectId(data.userId),
                doctorId: new mongoose_1.default.Types.ObjectId(data.doctorId),
                amount: data.amount,
                currency: "INR",
                status: "created",
                paymentMethod: "razorpay",
                razorpayOrderId: order.id,
            });
            return {
                id: order.id,
                amount: Number(order.amount),
                currency: order.currency,
                status: order.status,
            };
        });
    }
    verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entered into verify razorpay");
            const secret = process.env.RAZORPAY_SECRET_KEY;
            if (!secret) {
                throw new Error("RAZORPAY_SECRET_KEY is not set in environment variables.");
            }
            const expectedSignature = crypto_1.default
                .createHmac("sha256", secret)
                .update(`${razorpayOrderId}|${razorpayPaymentId}`)
                .digest("hex");
            const payment = yield this._paymentRepo.findByRazorpayOrderId(razorpayOrderId);
            if (!payment) {
                return { success: false, message: "Payment not found" };
            }
            if (expectedSignature === razorpaySignature) {
                yield this._paymentRepo.updateById(payment._id, {
                    razorpayPaymentId,
                    razorpaySignature,
                    status: "paid",
                });
                if (payment.appointmentId && payment._id) {
                    yield this._appointmentRepo.updateById(payment.appointmentId, { status: "confirmed", payment: "paid" });
                }
                let doctorWallet = yield this._walletRepo.findOne({ userId: payment.doctorId });
                if (!doctorWallet) {
                    doctorWallet = yield this._walletRepo.create({
                        userId: payment.doctorId,
                        role: "doctor",
                    });
                    if (!doctorWallet) {
                        throw new Error("Failed to create doctor wallet");
                    }
                }
                const amount = Math.floor(payment.amount - (payment.amount / 10));
                const walletHistoryDoctor = yield this._walletHistoryRepo.create({
                    walletId: doctorWallet._id,
                    appointmentId: new mongoose_1.default.Types.ObjectId(payment.appointmentId),
                    amount: amount,
                    type: "credit",
                    source: "consultation",
                    transactionId: new mongoose_1.default.Types.ObjectId(payment._id),
                });
                if (!walletHistoryDoctor) {
                    throw new Error("Failed to create doctor history");
                }
                const updateDoctor = yield this._walletRepo.updateById(doctorWallet._id, { $inc: { balance: amount } });
                console.log("updateDoctor : ", updateDoctor);
                if (!updateDoctor) {
                    throw new Error("Failed to update wallet balance");
                }
                const existing = yield this._chatRepo.findByAppointmentId(payment.appointmentId.toString());
                if (!existing) {
                    const chat = yield this._chatRepo.createChat({
                        appointmentId: payment.appointmentId,
                        participants: [payment.userId, payment.doctorId],
                        isActive: true,
                        doctorId: payment.doctorId,
                        userId: payment.userId,
                    });
                }
                return { success: true, message: "Payment verified successfully" };
            }
            else {
                yield this._paymentRepo.updateById(payment._id, {
                    status: "failed",
                    errorMessage: "Invalid signature",
                });
                return { success: false, message: "Invalid signature" };
            }
        });
    }
    createPayout(doctorId, amount, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDoctorId = new mongoose_1.default.Types.ObjectId(doctorId);
                const wallet = yield this._walletRepo.findOne({ userId: newDoctorId });
                if ((wallet === null || wallet === void 0 ? void 0 : wallet.balance) && amount > (wallet === null || wallet === void 0 ? void 0 : wallet.balance)) {
                    throw new Error("Request amount is greater than wallet balance");
                }
                const data = {
                    doctorId: newDoctorId,
                    amount,
                    reason,
                };
                const payout = yield this._payoutRepo.create(data);
                if (!payout) {
                    throw new Error("Failed to create Payment");
                }
                return { message: "Payout created successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error(" Something went wrong");
                }
            }
        });
    }
    getPayout(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const { payouts, total } = yield this._payoutRepo.getAllPayout(skip, limit);
                const totalPages = Math.ceil(total / limit);
                // console.log({payouts, total, totalPages});
                const cleanedPayouts = (0, paymentService_mapper_1.mapPayouts)(payouts);
                return { payouts: cleanedPayouts, total, totalPages };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Failed to fetch Payouts");
                }
            }
        });
    }
    getDoctorPayout(doctorId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const { payouts, total } = yield this._payoutRepo.getDoctorPayout(doctorId, skip, limit);
                const totalPages = Math.ceil(total / limit);
                const cleanedPayouts = (0, paymentService_mapper_1.mapPayouts)(payouts);
                return { payouts: cleanedPayouts, total, totalPages };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Failed to fetch Doctor Payouts");
                }
            }
        });
    }
    initiatePayout(payoutId, amount, doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = new mongoose_1.default.Types.ObjectId(payoutId);
                const payout = yield this._payoutRepo.findById(payoutId);
                if (!payout) {
                    throw new Error("Payout request not found");
                }
                if (payout.status !== "pending") {
                    throw new Error("Payment request already processed");
                }
                const wallet = yield this._walletRepo.findOne({ userId: doctorId });
                if (!wallet || wallet.balance < amount) {
                    throw new Error("Wallet don't have sufficient balance for Payout");
                }
                const approve = yield this._payoutRepo.updateById(payoutId, {
                    status: "approved",
                    approvedAt: new Date(),
                });
                this._walletRepo.updateById(wallet._id, {
                    $inc: { balance: -amount },
                });
                yield this._walletHistoryRepo.create({
                    walletId: wallet._id,
                    amount: amount,
                    type: "debit",
                    source: "payout",
                    status: "success",
                    transactionId: new mongoose_1.default.Types.ObjectId(payoutId),
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Failed to initiate payout");
                }
            }
        });
    }
    downloadRecept(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._paymentRepo.getPaymentInfo(appointmentId);
                if (!data) {
                    throw new Error("Failed to get payment details");
                }
                return this.generateReceiptPDF(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    generateReceiptPDF(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ margin: 50 });
                const buffers = [];
                doc.on("data", buffers.push.bind(buffers));
                doc.on("end", () => {
                    const pdfBuffer = buffer_1.Buffer.concat(buffers);
                    resolve(pdfBuffer);
                });
                const logoPath = path_1.default.resolve(__dirname, "../../../public/images/logo2.png");
                if (fs_1.default.existsSync(logoPath)) {
                    doc.image(logoPath, 130, 30, { width: 60 });
                }
                doc.fontSize(20).text("Prescripto Online Consultancy", 130, 50);
                doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
                doc.moveDown(2);
                doc
                    .fontSize(16)
                    .fillColor("#000")
                    .text("Payment Receipt", { align: "center", underline: true });
                doc.moveDown();
                const createdAt = new Date(data.createdAt).toLocaleDateString();
                doc
                    .fontSize(12)
                    .fillColor("black")
                    .text(`Receipt Date: ${createdAt}`)
                    .text(`Appointment No: ${data.appointmentId.appointmentNo}`)
                    .text(`Doctor: Dr. ${data.doctorId.name}`)
                    .text(`Payment ID: ${data.razorpayOrderId}`)
                    .moveDown();
                doc
                    .fontSize(14)
                    .text("Payment Details", { underline: true })
                    .moveDown(0.5);
                doc.fontSize(12).text(`Date: ${data.appointmentId.day} ${data.appointmentId.time}`);
                doc.text(`Fee Amount: ${data.amount}`);
                doc.text(`Currency: ${data.currency}`);
                doc.text(`Payment Mode: Razorpay`);
                doc.text(`Payment Status: ${data.status}`);
                doc.moveDown(2);
                doc
                    .fontSize(10)
                    .fillColor("gray")
                    .text("Prescripto Online Consultancy • +91-9876543210 • support@prescripto.com", {
                    align: "center",
                });
                doc.end();
            });
        });
    }
}
exports.PaymentService = PaymentService;
// import express from "express";
// import Razorpay from "razorpay";
// import axiosInstance from "../utils/axios"; // Your existing axios instance
// const router = express.Router();
// const razorpay = new Razorpay({
//   key_id: "rzp_test_YOUR_TEST_KEY_ID",
//   key_secret: "YOUR_TEST_KEY_SECRET",
// });
// router.post("/payout", async (req, res) => {
//   try {
//     const { doctorId, amount } = req.body; // Amount in paise (e.g., 10000 = ₹100)
//     // Mock beneficiary details for test mode
//     const beneficiary = {
//       account_number: "7878787878787878", // Test account number
//       ifsc: "RAZORTEST", // Test IFSC code
//       fund_account_id: "FA1234567890", // Mock fund account ID (optional)
//     };
//     // Simulate payout creation (test mode)
//     const payout = await razorpay.payouts.create({
//       account_number: beneficiary.account_number,
//       ifsc: beneficiary.ifsc,
//       amount: amount, // In paise
//       currency: "INR",
//       mode: "IMPS", // Test mode supports IMPS
//       purpose: "consultation_earnings",
//       queue_if_low_balance: true, // Optional
//     });
//     // Update wallet or database (mock deduction)
//     await updateWallet(doctorId, amount);
//     res.status(200).json({
//       status: "success",
//       data: payout,
//       message: "Payout simulated successfully in test mode",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message || "Error processing test payout",
//     });
//   }
// });
// // Helper function (mock implementation)
// async function updateWallet(doctorId: string, amount: number) {
//   // Simulate wallet deduction (e.g., update database)
//   // Example: await axiosInstance.patch(`/wallet/${doctorId}`, { amount, status: "paid" });
//   console.log(`Mock deducted ₹${amount / 100} from wallet for doctor ${doctorId}`);
// }
// export default router;
// async getPayout(): Promise<IPayout[] | []> {
//    try {
//       const payout = await this._payoutRepo.getAllPayout();
//       return payout;
//    }catch (error) {
//       if(error instanceof Error){
//         throw error;
//       }else{
//         throw new Error("Failed to fetch Payouts");
//       }    
//    }
// }
//   async getDoctorPayout(doctorId: string): Promise<IPayout[] | []> {
//    try {
//       const payout = await this._payoutRepo.findAll({doctorId});
//       return payout;
//    }catch (error) {
//       if(error instanceof Error){
//         throw error;
//       }else{
//         throw new Error("Failed to fetch Payouts");
//       }    
//    }
// }
