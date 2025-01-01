import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";

router.put("/:noteId", async (req, res) => {
  
  try {
    const { noteId } = req.params;
  const { title, description } = req.body;
    const token = req.body.headers.Authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(403).json({ message: "Note not found" });
    }

    note.title = title;
    note.description = description;
    note.updatedAt = Date.now();
    await note.save();

    return res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating note" });
  }
});

export default router;
