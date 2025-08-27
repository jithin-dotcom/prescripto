

import { Router } from "express";

import { PrescriptionRepository } from "../repositories/implementation/prescription.repository";
import { PrescriptionService } from "../services/implementation/prescription.services";
import { PrescriptionController } from "../controllers/implementation/prescription.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

const prescriptionRepository = new PrescriptionRepository();
const prescriptionService = new PrescriptionService(prescriptionRepository);
const prescriptionController = new PrescriptionController(prescriptionService);

router.use(verifyAccessToken);

router.post("/create-prescription", checkRole("doctor"), prescriptionController.createPrescription.bind(prescriptionController));
router.get("/get-prescription/:appointmentId", checkRole("doctor","user","admin"), prescriptionController.getPrescription.bind(prescriptionController));
router.get("/get-editPrescription/:appointmentId", checkRole("doctor"), prescriptionController.getEditPrescription.bind(prescriptionController));
router.post("/update-prescription/:appointmentId", checkRole("doctor"), prescriptionController.editPrescription.bind(prescriptionController));
router.get("/download-prescription/:appointmentId", checkRole("user"), prescriptionController.downloadPrescription.bind(prescriptionController));
router.get("/patient-history/:patientId", checkRole("doctor"), prescriptionController.getPatientHistory.bind(prescriptionController));
export default router;
