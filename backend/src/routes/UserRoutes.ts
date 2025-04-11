import express from "express"
import { UserController } from "../controller/UserController.ts"

const router = express.Router();

router.get("/", UserController.all);
router.get("/:id", UserController.one);
router.post("/", UserController.save);
router.delete("/:id", UserController.remove);

export default router;