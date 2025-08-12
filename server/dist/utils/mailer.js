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
exports.sendOtpMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("../config/env.config"));
const sendOtpMail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: env_config_1.default.NODEMAILER_EMAIL,
                pass: env_config_1.default.NODEMAILER_PASSWORD,
            },
        });
        const mailOptions = {
            from: '"TeleCare" <yourapp@example.com>',
            to: email,
            subject: "Your OTP Verification Code",
            html: `<p>Your OTP is: <b>${otp}</b></p>`,
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        console.log("Email response:", info.response);
        return true;
    }
    catch (error) {
        console.error("Failed to send email:", error);
        return false;
    }
});
exports.sendOtpMail = sendOtpMail;
