import { Router } from "express";
import { AuthController } from "../controller/AuthController.ts";
import { authMiddleware } from "../middleware/AuthMiddleware.ts";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/profile", authMiddleware, AuthController.profile);

export default router;