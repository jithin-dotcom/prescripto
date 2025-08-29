
import { Router } from "express";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { DoctorProfileService } from "../services/implementation/doctorProfile.services";
import { DoctorProfileController } from "../controllers/implementation/doctorProfile.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();
const doctorProfileRepository = new DoctorProfileRepository();
const doctorProfileService = new DoctorProfileService(doctorProfileRepository);
const doctorProfileController = new DoctorProfileController(doctorProfileService);

router.use(verifyAccessToken);

router.post("/create-doctor-profile/:doctorId", checkRole("doctor") ,doctorProfileController.createProfile.bind(doctorProfileController));
router.put("/edit-doctor-profile/:doctorId",checkRole("doctor"), doctorProfileController.editProfile.bind(doctorProfileController));
router.get("/top-doctor-rating",checkRole("user"), doctorProfileController.findDoctorWithRating.bind(doctorProfileController));

export default router;