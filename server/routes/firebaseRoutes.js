import express from "express";
const router = express.Router();
import { notificationController } from "../controllers/firebaseController.js";

router.post("/send-notification", notificationController);

export default router;