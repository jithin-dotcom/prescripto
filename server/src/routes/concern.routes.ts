
import { Router } from "express";
import { ConcernRepository } from "../repositories/implementation/concern.repositories";
import { ConcernService } from "../services/implementation/concern.service";
import { ConcernController } from "../controllers/implementation/concern.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = Router();

const concernRepository = new ConcernRepository();
const concernService = new ConcernService(concernRepository);
const concernController = new ConcernController(concernService);

router.use(verifyAccessToken);


router.post("/raise-concern", concernController.createConcern.bind(concernController));
router.get("/get-allConcerns", concernController.getAllConcerns.bind(concernController));
router.patch("/update-concern/:id", concernController.updateStatus.bind(concernController));
router.get("/user-concerns", concernController.getConcernsByUser.bind(concernController));

export default router;


