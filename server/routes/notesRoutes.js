import express from "express";
import { getNotes, createNote, deleteNote, getNote, updateNote, searchNotes } from "../controllers/notesController.js";
import isAuthentic from "../middleware/authMiddleware";

const router = express.Router();

router.get("/get-notes", isAuthentic, getNotes);
router.post("/create-note", isAuthentic, createNote);
router.delete("/delete-note", isAuthentic, deleteNote);
router.post("/get-note", isAuthentic, getNote);
router.put("/update-note/:noteId", isAuthentic, updateNote);
router.post("/search-notes", isAuthentic, searchNotes);

export default router;