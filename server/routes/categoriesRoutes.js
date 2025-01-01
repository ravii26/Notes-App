import express from "express";
import { getCategories } from "../controllers/categoriesController.js";
import isAuthentic from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/get-categories", isAuthentic, getCategories);
router.post("/create-category", isAuthentic, createCategory);
router.delete("/delete-category", isAuthentic, deleteCategory);

export default router;