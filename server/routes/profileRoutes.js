import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import isAuthentic from "../middleware/authMiddleware.js";
const router = express.Router();
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/get-profile", isAuthentic, getProfile);
router.put("/update-profile", upload.single("profileImage"), isAuthentic, updateProfile);

export default router;
