import express from "express";

import {
  getDevices,
  removeDevice,
} from "../controllers/deviceController.js";
import isAuthentic from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-devices", isAuthentic, getDevices);
router.get("/logout-device", isAuthentic, removeDevice);
router.post("/remove-device", isAuthentic, removeDevice);

export default router;
