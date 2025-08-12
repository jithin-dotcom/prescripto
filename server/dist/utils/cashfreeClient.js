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
exports.getAuthToken = void 0;
const axios_1 = __importDefault(require("axios"));
const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
const baseUrl = 'https://payout-gamma.cashfree.com'; // Sandbox
let token = null;
const getAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (token)
        return token;
    try {
        console.log("Client ID:", clientId);
        console.log("Client Secret:", clientSecret);
        const response = yield axios_1.default.post(`${baseUrl}/payout/v1/authorize`, {}, {
            headers: {
                'X-Client-Id': clientId,
                'X-Client-Secret': clientSecret,
            },
        });
        console.log("Cashfree Auth Response:", response.data);
        if (response.data.status === "SUCCESS") {
            token = response.data.data.token;
            return token;
        }
        else {
            throw new Error(response.data.message || "Auth failed");
        }
    }
    catch (error) {
        console.error("Cashfree Auth Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("Failed to get Cashfree token");
    }
});
exports.getAuthToken = getAuthToken;
