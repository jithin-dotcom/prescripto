"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPatientProfilePersistence = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const toPatientProfilePersistence = (patientId, dto) => {
    return Object.assign(Object.assign({}, dto), { patientId: new mongoose_1.default.Types.ObjectId(patientId) });
};
exports.toPatientProfilePersistence = toPatientProfilePersistence;
