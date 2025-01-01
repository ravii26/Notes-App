import express from "express";
import { Category } from "../../models/categories.js";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });
    const device = user.devices.find(
      (device) => device.deviceId === decoded.deviceId
    );
    if (!device) return res.status(404).send({ message: "Device not found" });
    const categories = await Category.find({ user: user._id });

    if (!categories)
      return res.status(404).send({ message: "Categories not found" });

    res.status(200).send({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
