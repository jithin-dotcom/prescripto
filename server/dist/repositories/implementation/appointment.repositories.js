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
exports.AppointmentRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const appointment_models_1 = require("../../models/appointment/appointment.models");
class AppointmentRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(appointment_models_1.AppointmentModel);
    }
    findDoctor(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_models_1.AppointmentModel.find({ doctorId }).populate("doctorId").exec();
        });
    }
    findAllPopulatedPaginated(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find()
                .populate("doctorId")
                .populate("userId")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
        });
    }
    countAllFiltered(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments(filter);
        });
    }
    findAllPopulatedPaginatedFiltered(skip, limit, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find(filter)
                .populate("doctorId")
                .populate("userId")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
        });
    }
    findDoctorFilteredPaginated(skip, limit, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_models_1.AppointmentModel.find(filter)
                .populate("userId")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec();
        });
    }
    findUserFilteredPaginated(skip, limit, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find(filter)
                .populate("doctorId")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
        });
    }
    updatePaymentStatus(appointmentId, status, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield appointment_models_1.AppointmentModel.findByIdAndUpdate(appointmentId, { payment: status, transactionId });
        });
    }
    cancelWithRefundIfPaid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.model.updateOne({ _id: id }, [
                {
                    $set: {
                        status: "cancelled",
                        payment: {
                            $cond: [{ $eq: ["$payment", "paid"] }, "refund", "$payment"],
                        },
                    },
                },
            ]);
            return res.modifiedCount > 0;
        });
    }
}
exports.AppointmentRepository = AppointmentRepository;
