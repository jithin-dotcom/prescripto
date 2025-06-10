
import { Router } from "express";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { PatientProfileService } from "../services/implementation/patientProfile.services";
import { PatientProfileController } from "../controllers/implementation/patientProfile.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { upload } from "../middlewares/multer.middleware";


const router = Router();
const patientProfileRepository = new PatientProfileRepository();
const userRepository = new UserRepository();
const patientProfileService = new PatientProfileService(patientProfileRepository,userRepository);
const patientProfileController = new PatientProfileController(patientProfileService);

router.use(verifyAccessToken);

router.post("/create-patientProfile/:patientId",patientProfileController.createProfile.bind(patientProfileController));
router.put("/edit-patientProfile/:patientId", patientProfileController.editProfile.bind(patientProfileController));
router.delete("/delete-patientProfile/:patientId",patientProfileController.deleteProfile.bind(patientProfileController));
router.post('/upload-photo', upload.single('photo'), patientProfileController.uploadPhoto.bind(patientProfileController));

export default router;