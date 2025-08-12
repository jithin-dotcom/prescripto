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
exports.PrescriptionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prescriptionService_mapper_1 = require("../../utils/mapper/prescriptionService.mapper");
class PrescriptionService {
    constructor(_prescriptionRepo) {
        this._prescriptionRepo = _prescriptionRepo;
    }
    createPrescription(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prescription = yield this._prescriptionRepo.create(data);
                if (!prescription) {
                    throw new Error("Failed to create Prescription");
                }
                return { message: "Prescription created Successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    getPrescription(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!appointmentId) {
                    throw new Error("AppointmentId missing");
                }
                const appId = new mongoose_1.default.Types.ObjectId(appointmentId);
                const prescription = yield this._prescriptionRepo.getPrescription(appId);
                if (!prescription) {
                    return null;
                }
                return (0, prescriptionService_mapper_1.mapPrescription)(prescription);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    getEditPrescription(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!appointmentId) {
                    throw new Error("AppointmentId missing");
                }
                const appId = new mongoose_1.default.Types.ObjectId(appointmentId);
                const prescription = yield this._prescriptionRepo.getPrescription(appId);
                if (!prescription) {
                    throw new Error("Prescription not found");
                }
                return (0, prescriptionService_mapper_1.mapPrescription)(prescription);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    editPrescription(appointmentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!appointmentId) {
                    throw new Error("AppointmentId required");
                }
                const appId = new mongoose_1.default.Types.ObjectId(appointmentId);
                const prescription = yield this._prescriptionRepo.findOne({ appointmentId: appId });
                // console.log("prescription : ",prescription );
                if (!prescription) {
                    throw new Error("No Prescription Found");
                }
                const result = yield this._prescriptionRepo.updatePrescription(appId, data);
                if (!result) {
                    throw new Error("Failed to update Prescription");
                }
                return { message: "Prescription Updated Successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    generatePrescriptionPDF(prescription) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ margin: 50 });
                const buffers = [];
                doc.on("data", buffers.push.bind(buffers));
                doc.on("end", () => {
                    const pdfBuffer = Buffer.concat(buffers);
                    resolve(pdfBuffer);
                });
                const logoPath = path_1.default.join(__dirname, "../../../public/images/logo2.png");
                if (fs_1.default.existsSync(logoPath)) {
                    doc.image(logoPath, 130, 25, { width: 70 });
                }
                console.log("Resolved Logo Path:", logoPath);
                console.log("File exists?", fs_1.default.existsSync(logoPath));
                doc.fontSize(20).text("Prescripto Hospital", 130, 50);
                doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
                doc.moveDown(2);
                const today = new Date().toLocaleDateString();
                doc.fontSize(10).text(`Date: ${today}`, { align: "right" });
                doc.moveDown();
                doc.fontSize(12).text(`Doctor: Dr. ${prescription.doctorId.name}`);
                doc.text(`Patient: ${prescription.patientId.name}`);
                doc.text(`Appointment Date: ${new Date(prescription.appointmentId.date).toLocaleDateString()}`);
                doc.moveDown();
                doc.fontSize(12).text(`Diagnosis: ${prescription.diagnosis}`);
                if (prescription.notes)
                    doc.text(`Notes: ${prescription.notes}`);
                if (prescription.followUpDate) {
                    doc.text(`Follow-Up Date: ${new Date(prescription.followUpDate).toLocaleDateString()}`);
                }
                doc.moveDown();
                doc.fontSize(12).text("Medicines", { underline: true });
                prescription.medicines.forEach((med, index) => {
                    doc.text(`${index + 1}. ${med.name} - ${med.dosage}, ${med.frequency}, ${med.duration}. Instructions: ${med.instructions}`);
                });
                doc.moveDown(3);
                const signPath = path_1.default.join(__dirname, "../../../public/images/signature.png");
                if (fs_1.default.existsSync(signPath)) {
                    doc.image(signPath, doc.page.width - 150, doc.y, { width: 100 });
                }
                doc.text("Dr. " + prescription.doctorId.name, doc.page.width - 150, doc.y + 50);
                doc.moveDown(4);
                doc
                    .fontSize(10)
                    .fillColor("gray")
                    .text("Prescripto Hospital • +91-9876543210 • support@prescripto.com", {
                    align: "center",
                });
                doc.end();
            });
        });
    }
}
exports.PrescriptionService = PrescriptionService;
