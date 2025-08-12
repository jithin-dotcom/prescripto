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
exports.PatientProfileRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const patientProfile_models_1 = require("../../models/patient/patientProfile.models");
const mongoose_1 = __importDefault(require("mongoose"));
class PatientProfileRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(patientProfile_models_1.PatientProfileModel);
    }
    findByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = typeof patientId === "string" ? new mongoose_1.default.Types.ObjectId(patientId) : patientId;
            return yield this.model.findOne({ patientId: id });
        });
    }
    updateByPatientId(patientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = typeof patientId === "string" ? new mongoose_1.default.Types.ObjectId(patientId) : patientId;
            return yield this.model.findOneAndUpdate({ patientId: id }, data, { new: true });
        });
    }
}
exports.PatientProfileRepository = PatientProfileRepository;
