import express from "express"
import { ServiceController } from "../controller/ServiceController.ts"

const router = express.Router();

router.get("/", ServiceController.all);
router.get("/:id", ServiceController.one);
router.post("/", ServiceController.save);
router.delete("/:id", ServiceController.remove);

export default router;