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
exports.OtpRepository = void 0;
const otp_models_1 = require("../../models/otp.models");
class OtpRepository {
    createOtp(email, otp, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield otp_models_1.OtpModel.findOneAndDelete({ email });
            yield otp_models_1.OtpModel.create({ email, otp, user });
        });
    }
    findOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield otp_models_1.OtpModel.findOne({ email });
        });
    }
    deleteOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield otp_models_1.OtpModel.deleteOne({ email });
        });
    }
}
exports.OtpRepository = OtpRepository;
