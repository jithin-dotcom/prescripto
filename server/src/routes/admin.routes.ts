
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware"
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { AdminService } from "../services/implementation/admin.services";
import { AdminController } from "../controllers/implementation/admin.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";
import { RequestHandler } from "express";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";



const router =  Router();

const adminRepository = new AdminRepository();
const patientProfileRepository = new PatientProfileRepository();
const doctorProfileRepository = new DoctorProfileRepository();
const adminService = new AdminService(adminRepository, patientProfileRepository, doctorProfileRepository);
const adminController = new AdminController(adminService);

router.use(verifyAccessToken);
// const roleMiddleware: RequestHandler = checkRole("admin");
// router.use(roleMiddleware);




router.post(
  '/create-users',
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
  adminController.createUserOrDoctor.bind(adminController)
);


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
  adminController.updateUserOrDoctor.bind(adminController)
);

// router.get("/users", adminController.getAllUser.bind(adminController));
router.get('/users', adminController.getUsersByRole.bind(adminController));
// router.post('/create-users', adminController.createUserOrDoctor.bind(adminController));
// router.post('/update-users/:id',adminController.updateUserOrDoctor.bind(adminController));
router.delete('/delete-users/:id',adminController.deleteUserOrDoctor.bind(adminController));
router.patch('/block-toggle/:id',adminController.toggleBlockUser.bind(adminController));
router.patch('/verify-toggle/:id',adminController.toggleVerifyUser.bind(adminController));
router.get('/get-user/:id',adminController.getUserById.bind(adminController));
router.get('/users-count',adminController.getAllUser.bind(adminController));

export default router;











// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' }); // Disk storage, change as needed

// const uploadFields = upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'proofDocument', maxCount: 10 },
// ]);

// router.post(
//   '/create-users',
//   uploadFields,
//   adminController.createUserOrDoctor.bind(adminController)
// );