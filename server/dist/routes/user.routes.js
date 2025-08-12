"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_repositories_1 = require("../repositories/implementation/user.repositories");
const user_service_1 = require("../services/implementation/user.service");
const user_controller_1 = require("../controllers/implementation/user.controller");
const patientProfile_repositories_1 = require("../repositories/implementation/patientProfile.repositories");
const doctorProfile_repositories_1 = require("../repositories/implementation/doctorProfile.repositories");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = (0, express_1.Router)();
const userRepository = new user_repositories_1.UserRepository();
const patientProfileRepository = new patientProfile_repositories_1.PatientProfileRepository();
const doctorProfileRepository = new doctorProfile_repositories_1.DoctorProfileRepository();
const userService = new user_service_1.UserService(userRepository, patientProfileRepository, doctorProfileRepository);
const userController = new user_controller_1.UserController(userService);
router.use(auth_middleware_1.verifyAccessToken);
router.get("/all-doctors", userController.getAllDoctors.bind(userController));
router.get("/user-profile/:id", userController.getProfile.bind(userController));
router.post("/change-password", userController.changePassword.bind(userController));
router.post("/change-email", userController.changeEmail.bind(userController));
router.put('/update-user/:id', multer_middleware_1.upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
]), userController.updateUserOrDoctor.bind(userController));
exports.default = router;
