

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


router.get("/all-doctors",userController.getAllDoctors.bind(userController));
router.get("/user-profile/:id",userController.getProfile.bind(userController));
router.post("/change-password",userController.changePassword.bind(userController));
router.post("/change-email",userController.changeEmail.bind(userController));


router.put(
  '/update-user/:id',
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
  ]),
  userController.updateUserOrDoctor.bind(userController)
);


export default router;


