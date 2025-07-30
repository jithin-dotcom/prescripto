

import { Router } from "express";

import { PrescriptionRepository } from "../repositories/implementation/prescription.repository";
import { PrescriptionService } from "../services/implementation/prescription.services";
import { PrescriptionController } from "../controllers/implementation/prescription.controller";

const router = Router();

const prescriptionRepository = new PrescriptionRepository();
const prescriptionService = new PrescriptionService(prescriptionRepository);
const prescriptionController = new PrescriptionController(prescriptionService);

router.post("/create-prescription", prescriptionController.createPrescription.bind(prescriptionController));
router.get("/get-prescription/:appointmentId", prescriptionController.getPrescription.bind(prescriptionController));

export default router;
