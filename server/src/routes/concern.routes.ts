
import { Router } from "express";
import { ConcernRepository } from "../repositories/implementation/concern.repositories";
import { ConcernService } from "../services/implementation/concern.service";
import { ConcernController } from "../controllers/implementation/concern.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

const concernRepository = new ConcernRepository();
const concernService = new ConcernService(concernRepository);
const concernController = new ConcernController(concernService);

router.use(verifyAccessToken);


router.post("/raise-concern",checkRole("user"), concernController.createConcern.bind(concernController));
router.get("/get-allConcerns",checkRole("admin"), concernController.getAllConcerns.bind(concernController));
router.patch("/update-concern/:id",checkRole("admin"), concernController.updateStatus.bind(concernController));
router.get("/user-concerns",checkRole("user","doctor"), concernController.getConcernsByUser.bind(concernController));

export default router;


