

import { Router } from "express";

import { DoctorRatingRepository } from "../repositories/implementation/doctorRating.repository";
import { DoctorRatingController } from "../controllers/implementation/doctorRating.controller";
import { DoctorRatingService } from "../services/implementation/doctorRating.services";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { checkRole } from "../middlewares/role.middleware";


const router = Router();

const doctorRatingRepository = new DoctorRatingRepository();
const doctorProfileRepository = new DoctorProfileRepository()
const doctorRatingService = new DoctorRatingService(doctorRatingRepository, doctorProfileRepository);
const doctorRatingController = new DoctorRatingController(doctorRatingService);

router.post("/rate-doctor", checkRole("user"), doctorRatingController.rateDoctor.bind(doctorRatingController));
router.get("/get-rating/:doctorId", checkRole("user","doctor","admin"), doctorRatingController.getRatingByDoctor.bind(doctorRatingController));

export default router;