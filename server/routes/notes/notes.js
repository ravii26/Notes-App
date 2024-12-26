import express from "express";
const router = express.Router();
import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const page = Math.max(1, parseInt(req.query.page) || 1); // Default to page 1
    const limit = Math.max(1, parseInt(req.query.limit) || 10); // Default to 10 notes per page
    const skip = (page - 1) * limit;
    let notes;
    let totalNotes;

    if (user.isAdmin) {
       notes = await Note.find()
        .populate("category")
        .skip(skip)
        .limit(Number(limit));
      
         totalNotes = await Note.countDocuments({});
    } else {
       notes = await Note.find({ user: user._id })
      .populate("category")
      .skip(skip)
        .limit(Number(limit));
         totalNotes = await Note.countDocuments({ user: user._id});
    }
   
    if (!notes) return res.status(404).send({ message: "Notes not found" });

    res
      .status(200)
      .send({
        notes,
        totalNotes,
        totalPages: Math.ceil(totalNotes / limit),
        currentPage: Number(page),
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
