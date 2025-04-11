import express from "express"
import { TimetableController } from "../controller/TimetableController.ts"

const router = express.Router();

router.get("/", TimetableController.all);
router.get("/:id", TimetableController.one);
router.post("/", TimetableController.save);
router.delete("/:id", TimetableController.remove);

export default router;