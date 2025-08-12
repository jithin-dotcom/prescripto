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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const payment_models_1 = require("../../models/payment/payment.models");
const base_repositories_1 = require("../implementation/base.repositories");
class PaymentRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(payment_models_1.Payment);
    }
    findByRazorpayOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ razorpayOrderId: orderId });
        });
    }
    getPaymentInfo(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ appointmentId }).populate("appointmentId doctorId");
        });
    }
}
exports.PaymentRepository = PaymentRepository;
