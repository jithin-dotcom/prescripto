
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware"
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.services";
import { AdminController } from "../controllers/implementation/admin.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";



const router =  Router();

const adminRepository = new AdminRepository();
const patientProfileRepository = new PatientProfileRepository();
const doctorProfileRepository = new DoctorProfileRepository();
const adminService = new AdminService(adminRepository, patientProfileRepository, doctorProfileRepository);
const adminController = new AdminController(adminService);

router.use(verifyAccessToken);


router.post(
  '/create-users',
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
  ]),
  checkRole("admin"),
  adminController.createUserOrDoctor.bind(adminController)
);



router.put(
  '/update-user/:id',
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
  ]),
  checkRole("admin","doctor"),
  adminController.updateUserOrDoctor.bind(adminController)   
);

router.get('/users',checkRole("admin"), adminController.getUsersByRole.bind(adminController));
router.delete('/delete-users/:id',checkRole("admin"), adminController.deleteUserOrDoctor.bind(adminController));
router.patch('/block-toggle/:id',checkRole("admin"), adminController.toggleBlockUser.bind(adminController));
router.patch('/verify-toggle/:id',checkRole("admin"), adminController.toggleVerifyUser.bind(adminController));
router.get('/get-user/:id', checkRole("admin","user","doctor"), adminController.getUserById.bind(adminController));   
router.get('/users-count',checkRole("admin"), adminController.getAllUser.bind(adminController));

export default router;









