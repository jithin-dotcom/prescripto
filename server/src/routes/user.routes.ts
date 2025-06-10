

import { Router } from "express";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { UserService } from "../services/implementation/user.service";
import { UserController } from "../controllers/implementation/user.controller";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware"

const router = Router()

const userRepository = new UserRepository();
const patientProfileRepository = new PatientProfileRepository();
const doctorProfileRepository = new DoctorProfileRepository();
const userService = new UserService(userRepository, patientProfileRepository, doctorProfileRepository);
const userController = new UserController(userService);

router.use(verifyAccessToken);

router.get("/top-doctors",userController.getTopDoctors.bind(userController));
router.get("/all-doctors",userController.getAllDoctors.bind(userController));
router.get("/user-profile/:id",userController.getProfile.bind(userController));



router.put(
  '/update-user/:id',
  (req, res, next) => {
    console.log("🔹 Route hit at", new Date().toISOString());
    next();
  },
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
  ]),
   (req, res, next) => {
    console.log("🔹 Multer parsed files:", req.files);
    next();
  },
  userController.updateUserOrDoctor.bind(userController)
);



export default router


