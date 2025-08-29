
import { Router } from "express";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { PatientProfileService } from "../services/implementation/patientProfile.services";
import { PatientProfileController } from "../controllers/implementation/patientProfile.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { upload } from "../middlewares/multer.middleware";
import { checkRole } from "../middlewares/role.middleware";


const router = Router();
const patientProfileRepository = new PatientProfileRepository();
const userRepository = new UserRepository();
const patientProfileService = new PatientProfileService(patientProfileRepository,userRepository);
const patientProfileController = new PatientProfileController(patientProfileService);

router.use(verifyAccessToken);

router.post("/create-patientProfile/:patientId", checkRole("user"), patientProfileController.createProfile.bind(patientProfileController));
router.put("/edit-patientProfile/:patientId", checkRole("user"), patientProfileController.editProfile.bind(patientProfileController));
router.post('/upload-photo', upload.single('photo'), checkRole("user","doctor"), patientProfileController.uploadPhoto.bind(patientProfileController));

export default router;