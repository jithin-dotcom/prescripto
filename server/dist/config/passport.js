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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_models_1 = require("../models/user.models");
const jwt_1 = require("../utils/jwt");
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_models_1.UserModel.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let user = yield user_models_1.UserModel.findOne({ googleId: profile.id });
        if (!user) {
            user = yield user_models_1.UserModel.findOne({ email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value });
            if (user) {
                user.googleId = profile.id;
                user.authProvider = "google";
                yield user.save();
            }
            else {
                user = yield user_models_1.UserModel.create({
                    googleId: profile.id,
                    email: (_b = profile.emails) === null || _b === void 0 ? void 0 : _b[0].value,
                    name: profile.displayName,
                    role: "user",
                    isVerified: true,
                    authProvider: "google",
                });
            }
        }
        const tokens = (0, jwt_1.generateTokens)({ userId: user._id, role: user.role });
        return done(null, { user, tokens });
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;
