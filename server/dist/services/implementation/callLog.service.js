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
exports.CallLogService = void 0;
const callLogService_mapper_1 = require("../../utils/mapper/callLogService.mapper");
class CallLogService {
    constructor(_callLogRepo, _appointmentRepo, _walletRepo, _WalletHistoryRepo) {
        this._callLogRepo = _callLogRepo;
        this._appointmentRepo = _appointmentRepo;
        this._walletRepo = _walletRepo;
        this._WalletHistoryRepo = _WalletHistoryRepo;
    }
    logCall(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = data.appointmentId;
                if (!appointmentId) {
                    throw new Error("AppointmentId missing");
                }
                if (data.callStatus === "completed") {
                    yield this._appointmentRepo.updateById(appointmentId, { status: "completed" });
                }
                yield this._callLogRepo.createLog(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    paymentDoctor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = data.userId;
                if (!userId) {
                    throw new Error("UserId required  for creating Wallet");
                }
                let existingWallet = yield this._walletRepo.findOne({ userId });
                if (!existingWallet) {
                    existingWallet = yield this._walletRepo.create(data);
                }
                return existingWallet;
            }
            catch (error) {
                console.log("error in paymentDoctor : ", error);
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong in creating Wallet");
                }
            }
        });
    }
    doctorPaymentHistory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = data.appointmentId;
                if (!appointmentId) {
                    throw new Error("AppointmentId  required for PaymentHistory");
                }
                if (!data.walletId) {
                    throw new Error("WalletId required for PaymentHistory");
                }
                const appointment = yield this._appointmentRepo.findById(appointmentId);
                if (!appointment) {
                    throw new Error("No appointment exists");
                }
                if (appointment.payment !== "paid") {
                    throw new Error("Payment is not done");
                }
                let amount = 0;
                if (appointment.fee) {
                    amount = appointment.fee - Math.floor(appointment.fee / 10);
                }
                console.log("amount : ", amount);
                const walletHistory = yield this._WalletHistoryRepo.create({
                    walletId: data.walletId,
                    appointmentId,
                    amount,
                    type: "credit",
                    source: "consultation",
                    transactionId: appointment.transactionId,
                });
                if (!walletHistory) {
                    throw new Error("Failed to create Wallet History");
                }
                const updatedBalance = yield this._walletRepo.updateById(data.walletId, { $inc: { balance: amount } });
                if (!updatedBalance) {
                    throw new Error("Failed to update Wallet Balance");
                }
                return (0, callLogService_mapper_1.mapWalletHistoryToDTO)(walletHistory);
            }
            catch (error) {
                console.log("error in doctorPaymentHistory : ", error);
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong in creating Wallet history");
                }
            }
        });
    }
}
exports.CallLogService = CallLogService;
