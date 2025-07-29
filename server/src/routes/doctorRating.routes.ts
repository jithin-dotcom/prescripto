

import { Router } from "express";

import { DoctorRatingRepository } from "../repositories/implementation/doctorRating.repository";
import { DoctorRatingController } from "../controllers/implementation/doctorRating.controller";
import { DoctorRatingService } from "../services/implementation/doctorRating.services";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";


const router = Router();

const doctorRatingRepository = new DoctorRatingRepository();
const doctorProfileRepository = new DoctorProfileRepository()
const doctorRatingService = new DoctorRatingService(doctorRatingRepository, doctorProfileRepository);
const doctorRatingController = new DoctorRatingController(doctorRatingService);

router.post("/rate-doctor",doctorRatingController.rateDoctor.bind(doctorRatingController));
router.get("/get-rating/:doctorId",doctorRatingController.getRatingByDoctor.bind(doctorRatingController));

export default router;