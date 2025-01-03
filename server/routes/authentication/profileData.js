import express from "express";
const router = express.Router();
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(404).send({ message: "User not found" });
    if(Buffer.isBuffer(user.profileImage)) {
      const base64Image = user.profileImage.toString("base64");
      user.profileImage = `data:image/png;base64,${base64Image}`;
    }
    res.status(200).send({ user });
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
export default router;
