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
exports.PrescriptionController = void 0;
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
const mongoose_1 = __importDefault(require("mongoose"));
const prescription_schema_1 = require("../../validations/prescription.schema");
const zod_1 = __importDefault(require("zod"));
class PrescriptionController {
    constructor(_prescriptionService) {
        this._prescriptionService = _prescriptionService;
    }
    createPrescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedData = prescription_schema_1.prescriptionSchema.parse(req.body);
                const convertedData = Object.assign(Object.assign({}, parsedData), { appointmentId: new mongoose_1.default.Types.ObjectId(parsedData.appointmentId), doctorId: new mongoose_1.default.Types.ObjectId(parsedData.doctorId), patientId: new mongoose_1.default.Types.ObjectId(parsedData.patientId), followUpDate: parsedData.followUpDate ? new Date(parsedData.followUpDate) : undefined });
                const newPrescription = yield this._prescriptionService.createPrescription(convertedData);
                res.status(statusCode_enum_1.StatusCode.CREATED).json({
                    status: "success",
                    message: "Prescription created successfully",
                    data: newPrescription,
                });
            }
            catch (error) {
                if (error instanceof zod_1.default.ZodError) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        status: "fail",
                        message: "Validation error",
                        errors: error.errors,
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    getPrescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                if (!appointmentId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                console.log("appointmentId : ", appointmentId);
                const response = yield this._prescriptionService.getPrescription(appointmentId);
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEditPrescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                if (!appointmentId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                console.log("appointmentId : ", appointmentId);
                const response = yield this._prescriptionService.getPrescription(appointmentId);
                if (!response) {
                    res.status(statusCode_enum_1.StatusCode.NOT_FOUND).json({ message: "Prescription not Found" });
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    editPrescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                if (!appointmentId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const parsedData = prescription_schema_1.prescriptionSchema.parse(req.body);
                const convertedData = Object.assign(Object.assign({}, parsedData), { appointmentId: new mongoose_1.default.Types.ObjectId(parsedData.appointmentId), doctorId: new mongoose_1.default.Types.ObjectId(parsedData.doctorId), patientId: new mongoose_1.default.Types.ObjectId(parsedData.patientId), followUpDate: parsedData.followUpDate ? new Date(parsedData.followUpDate) : undefined });
                const updatedPrescription = yield this._prescriptionService.editPrescription(appointmentId, convertedData);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    status: "success",
                    message: "Prescription Updated Successfully",
                    data: updatedPrescription,
                });
            }
            catch (error) {
                if (error instanceof zod_1.default.ZodError) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        status: "fail",
                        message: "Validation error",
                        errors: error.errors,
                    });
                }
                else {
                    next(error);
                }
            }
        });
    }
    downloadPrescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                const prescription = yield this._prescriptionService.getPrescription(appointmentId);
                if (!prescription) {
                    res.status(404).json({ message: "Prescription not found" });
                    return;
                }
                const pdfBuffer = yield this._prescriptionService.generatePrescriptionPDF(prescription);
                res.setHeader("Content-Disposition", `attachment; filename=prescription-${appointmentId}.pdf`);
                res.setHeader("Content-Type", "application/pdf");
                res.send(pdfBuffer);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
}
exports.PrescriptionController = PrescriptionController;
