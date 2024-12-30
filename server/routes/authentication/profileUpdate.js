import express from "express";
const router = express.Router();
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 5MB (optional)
});
router.put("/", upload.single("profileImage"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(404).send({ message: "User not found" });
    const { firstName, lastName, email } = req.body;
    const updateData = { firstName, lastName, email };
    

    if (req.file) {
      console.log(req.file.buffer.toString('base64'))
      updateData.profileImage = req.file.buffer.toString('base64');
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

export default router;
