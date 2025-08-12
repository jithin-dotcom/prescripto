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
exports.PaymentController = void 0;
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
const logger_1 = __importDefault(require("../../utils/logger"));
class PaymentController {
    constructor(_paymentService) {
        this._paymentService = _paymentService;
    }
    createRazorpayOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId, userId, doctorId, amount } = req.body;
                if (!appointmentId || !userId || !doctorId || !amount) {
                    res.status(400).json({ message: "Missing required fields" });
                    return;
                }
                const order = yield this._paymentService.createRazorpayOrder({
                    appointmentId,
                    userId,
                    doctorId,
                    amount: Number(amount),
                });
                res.status(201).json({ success: true, order });
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyPaymentSignature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
                if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
                    res.status(400).json({ message: "Missing required fields for verification" });
                    return;
                }
                const result = yield this._paymentService.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
                res.status(result.success ? 200 : 400).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createPayout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("Entered into controller");
                const { amount, reason } = req.body;
                const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const amountInt = parseInt(amount);
                if (!doctorId || !amountInt || !reason) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                yield this._paymentService.createPayout(doctorId, amount, reason);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: "Successfully created Payout Request" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPayouts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                if (page < 1 || limit < 1) {
                    throw new Error("Page and limit must be positive integers");
                }
                if (limit > 100) {
                    throw new Error("Limit cannot exceed 100");
                }
                const response = yield this._paymentService.getPayout(page, limit);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    data: response.payouts,
                    pagination: {
                        total: response.total,
                        totalPages: response.totalPages,
                        currentPage: page
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getDoctorPayouts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                if (!doctorId) {
                    throw new Error("Doctor ID is required");
                }
                if (page < 1 || limit < 1) {
                    throw new Error("Page and limit must be positive integers");
                }
                if (limit > 100) {
                    throw new Error("Limit cannot exceed 100");
                }
                const response = yield this._paymentService.getDoctorPayout(doctorId, page, limit);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    data: response.payouts,
                    pagination: {
                        total: response.total,
                        totalPages: response.totalPages,
                        currentPage: page
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    initiatePayout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payoutId, doctorId, amount } = req.body;
                if (!payoutId || !doctorId || !amount) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "Missing required fields: payoutId, doctorId, amount" });
                    return;
                }
                const amountInt = parseInt(amount);
                if (isNaN(amountInt) || amountInt <= 0) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "Invalid amount" });
                    return;
                }
                yield this._paymentService.initiatePayout(payoutId, amountInt, doctorId);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: "Payout initiated successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPaymentRecept(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                if (!appointmentId) {
                    res.status(400).json({ message: "Appointment ID is required" });
                    return;
                }
                const pdfBuffer = yield this._paymentService.downloadRecept(appointmentId);
                res.setHeader("Content-Disposition", `attachment; filename=receipt-${appointmentId}.pdf`);
                res.setHeader("Content-Type", "application/pdf");
                res.send(pdfBuffer);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to generate receipt" });
            }
        });
    }
}
exports.PaymentController = PaymentController;
