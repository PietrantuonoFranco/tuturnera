import express from "express"
import { RoleController } from "../controller/RoleController.ts"

const router = express.Router();

router.get("/", RoleController.all);
router.get("/:id", RoleController.one);
router.post("/", RoleController.save);
router.delete("/:id", RoleController.remove);

export default router;