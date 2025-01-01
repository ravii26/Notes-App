import express from "express";
const router = express.Router();
import {register, login} from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../middleware/validationMiddleware.js";

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

export default router;