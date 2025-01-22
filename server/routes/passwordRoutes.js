import express from "express";
const router = express.Router();
import { emailValidator } from "../middleware/validationMiddleware.js"; 
import { forgetPassword, verifyOtp, resetPassword } from "../controllers/passwordController.js";   

router.post("/forgot-password", emailValidator, forgetPassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

export default router;