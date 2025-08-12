"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const admin_repository_1 = require("../repositories/implementation/admin.repository");
const admin_services_1 = require("../services/implementation/admin.services");
const admin_controller_1 = require("../controllers/implementation/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const patientProfile_repositories_1 = require("../repositories/implementation/patientProfile.repositories");
const doctorProfile_repositories_1 = require("../repositories/implementation/doctorProfile.repositories");
const router = (0, express_1.Router)();
const adminRepository = new admin_repository_1.AdminRepository();
const patientProfileRepository = new patientProfile_repositories_1.PatientProfileRepository();
const doctorProfileRepository = new doctorProfile_repositories_1.DoctorProfileRepository();
const adminService = new admin_services_1.AdminService(adminRepository, patientProfileRepository, doctorProfileRepository);
const adminController = new admin_controller_1.AdminController(adminService);
router.use(auth_middleware_1.verifyAccessToken);
router.post('/create-users', multer_middleware_1.upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
]), adminController.createUserOrDoctor.bind(adminController));
router.put('/update-user/:id', multer_middleware_1.upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "proofDocument", maxCount: 5 }
]), adminController.updateUserOrDoctor.bind(adminController));
router.get('/users', adminController.getUsersByRole.bind(adminController));
router.delete('/delete-users/:id', adminController.deleteUserOrDoctor.bind(adminController));
router.patch('/block-toggle/:id', adminController.toggleBlockUser.bind(adminController));
router.patch('/verify-toggle/:id', adminController.toggleVerifyUser.bind(adminController));
router.get('/get-user/:id', adminController.getUserById.bind(adminController));
router.get('/users-count', adminController.getAllUser.bind(adminController));
exports.default = router;
