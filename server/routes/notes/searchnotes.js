import express from "express";
const router = express.Router();
import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  try {
    const token = req.body.headers.authorization?.split(" ")[1]; // 'Bearer <token>'

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const searchText = req.body.searchText;
    const notes = await Note.find({
      user: user._id,
      title: { $regex: searchText, $options: "i" },
    });

    if (!notes) return res.status(404).send({ message: "Notes not found" });

    res.status(200).send({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
