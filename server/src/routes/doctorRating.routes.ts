

import { Router } from "express";

import { DoctorRatingRepository } from "../repositories/implementation/doctorRating.repository";
import { DoctorRatingController } from "../controllers/implementation/doctorRating.controller";
import { DoctorRatingService } from "../services/implementation/doctorRating.services";

const router = Router();

const doctorRatingRepository = new DoctorRatingRepository();
const doctorRatingService = new DoctorRatingService(doctorRatingRepository);
const doctorRatingController = new DoctorRatingController(doctorRatingService);

router.post("/rate-doctor",doctorRatingController.rateDoctor.bind(doctorRatingController));

export default router;