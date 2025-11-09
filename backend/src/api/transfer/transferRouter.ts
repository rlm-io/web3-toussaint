import { Router } from "express";
import * as transferController from "./transferController";

const router = Router();

router.get("/", transferController.listTransferts);
router.get("/:id", transferController.getTransferDetail);
router.post("/", transferController.createTransfer);

export default router;