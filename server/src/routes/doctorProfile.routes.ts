
import { Router } from "express";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { DoctorProfileService } from "../services/implementation/doctorProfile.services";
import { DoctorProfileController } from "../controllers/implementation/doctorProfile.controller";

const router = Router();
const doctorProfileRepository = new DoctorProfileRepository();
const doctorProfileService = new DoctorProfileService(doctorProfileRepository);
const doctorProfileController = new DoctorProfileController(doctorProfileService);

router.post("/create-doctor-profile/:doctorId",doctorProfileController.createProfile.bind(doctorProfileController));
router.put("/edit-doctor-profile/:doctorId", doctorProfileController.editProfile.bind(doctorProfileController));
router.delete("/delete-doctor-profile/:doctorId",doctorProfileController.deleteProfile.bind(doctorProfileController));

export default router;