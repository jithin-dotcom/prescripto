"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorProfileModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TimeBlockSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
}, { _id: false });
const AvailabilitySlotSchema = new mongoose_1.Schema({
    day: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    slots: {
        type: [TimeBlockSchema],
        default: [],
    },
}, { _id: false });
const DoctorProfileSchema = new mongoose_1.Schema({
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    educationDetails: { type: String, required: true },
    specialization: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    registrationYear: { type: String, required: true },
    yearOfExperience: { type: Number, required: true },
    proofDocuments: [{ type: String }],
    fee: { type: Number, required: true },
    about: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    availability: {
        type: [AvailabilitySlotSchema],
        default: [],
    },
    slotDuration: {
        type: Number,
        default: 30,
    },
}, { timestamps: true });
exports.DoctorProfileModel = mongoose_1.default.model("DoctorProfile", DoctorProfileSchema);
