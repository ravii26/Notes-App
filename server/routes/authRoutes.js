import express from "express";
const router = express.Router();
import {register, login, googleAuth} from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../middleware/validationMiddleware.js";

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/googleauth", googleAuth)

export default router;