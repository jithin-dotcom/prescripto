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
exports.PayoutRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const payout_models_1 = require("../../models/payout/payout.models");
const mongoose_1 = __importDefault(require("mongoose"));
class PayoutRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(payout_models_1.PayoutModel);
    }
    getAllPayout(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [payouts, total] = yield Promise.all([
                this.model
                    .find()
                    .populate("doctorId")
                    .skip(skip)
                    .limit(limit)
                    .lean()
                    .exec(),
                this.model.countDocuments().exec()
            ]);
            return { payouts, total };
        });
    }
    getDoctorPayout(doctorId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [payouts, total] = yield Promise.all([
                this.model.find({ doctorId: new mongoose_1.default.Types.ObjectId(doctorId) })
                    .populate("doctorId")
                    .skip(skip)
                    .limit(limit)
                    .lean()
                    .exec(),
                this.model.countDocuments({ doctorId: new mongoose_1.default.Types.ObjectId(doctorId) }).exec()
            ]);
            return { payouts, total };
        });
    }
}
exports.PayoutRepository = PayoutRepository;
