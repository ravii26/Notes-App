import express from "express";
const router = express.Router();
import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  try {
    const { noteId } = req.body;
    const token = req.body.headers.Authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const note = await Note.findOneAndDelete({ _id: noteId });
    if (!note) return res.status(404).send({ message: "Note not found" });

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
