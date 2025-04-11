import express from "express"
import { AdressController } from "../controller/AdressController.ts"

const router = express.Router();

router.get("/", AdressController.all);
router.get("/:id", AdressController.one);
router.post("/", AdressController.save);
router.delete("/:id", AdressController.remove);

export default router;