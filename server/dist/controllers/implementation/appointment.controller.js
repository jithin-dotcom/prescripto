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
exports.AppointmentController = void 0;
const appointment_schema_1 = require("../../validations/appointment.schema");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class AppointmentController {
    constructor(_appointmentService) {
        this._appointmentService = _appointmentService;
    }
    createAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: statusMessage_1.StatusMessage.UNAUTHORIZED });
                    return;
                }
                const validatedData = appointment_schema_1.appointmentSchema.parse(Object.assign(Object.assign({}, req.body), { userId }));
                const appointment = yield this._appointmentService.createAppointment({
                    userId: validatedData.userId,
                    doctorId: validatedData.doctorId,
                    day: validatedData.date,
                    time: validatedData.time,
                    transactionId: validatedData.transactionId,
                });
                res.status(statusCode_enum_1.StatusCode.CREATED).json(appointment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCreateAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.params;
                if (!doctorId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const result = yield this._appointmentService.getCreateAppointment(doctorId);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserAppointments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 4;
                const status = req.query.status || "";
                const result = yield this._appointmentService.getAppointmentsByUser(userId, page, limit, status);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getDoctorAppointments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!doctorId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const status = req.query.status || "";
                const result = yield this._appointmentService.getAppointmentsByDoctor(doctorId, page, limit, status);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllAppointments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const status = req.query.status || "";
                const result = yield this._appointmentService.getAllAppointments(page, limit, status);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentId = req.params.appointmentId;
                const { status } = req.body;
                console.log("status : ", status);
                if (!appointmentId || !status) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "AppointmentId or Status Missing" });
                    return;
                }
                if (!["cancelled", "confirmed"].includes(status)) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "Invalid Status" });
                    return;
                }
                yield this._appointmentService.updateStatus(appointmentId, status);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: `Appointment ${status} successfully` });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAppointmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { appointmentId } = req.params;
                const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!doctorId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                if (!appointmentId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "AppointmentId missing" });
                    return;
                }
                const result = yield this._appointmentService.getAppointmentById(appointmentId, doctorId);
                if (!result) {
                    res.status(statusCode_enum_1.StatusCode.NOT_FOUND).json(statusMessage_1.StatusMessage.NOT_FOUND);
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
