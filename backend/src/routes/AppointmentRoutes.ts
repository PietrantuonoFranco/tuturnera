import express from "express"
import { AppointmentController } from "../controller/AppointmentController.ts"

const router = express.Router();

router.get("/", AppointmentController.all);
router.get("/:id", AppointmentController.one);
router.post("/", AppointmentController.save);
router.delete("/:id", AppointmentController.remove);

export default router;