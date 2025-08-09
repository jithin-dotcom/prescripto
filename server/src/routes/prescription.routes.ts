

import { Router } from "express";

import { PrescriptionRepository } from "../repositories/implementation/prescription.repository";
import { PrescriptionService } from "../services/implementation/prescription.services";
import { PrescriptionController } from "../controllers/implementation/prescription.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = Router();

const prescriptionRepository = new PrescriptionRepository();
const prescriptionService = new PrescriptionService(prescriptionRepository);
const prescriptionController = new PrescriptionController(prescriptionService);

router.use(verifyAccessToken)

router.post("/create-prescription", prescriptionController.createPrescription.bind(prescriptionController));
router.get("/get-prescription/:appointmentId", prescriptionController.getPrescription.bind(prescriptionController));
router.get("/get-editPrescription/:appointmentId", prescriptionController.getEditPrescription.bind(prescriptionController));
router.post("/update-prescription/:appointmentId", prescriptionController.editPrescription.bind(prescriptionController));
router.get("/download-prescription/:appointmentId", prescriptionController.downloadPrescription.bind(prescriptionController));
export default router;
