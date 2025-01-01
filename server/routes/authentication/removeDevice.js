import express from "express";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { deviceId } = req.body;
    const token = req.body.headers.Authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(403).send({ message: "User not found" });

    const device = user.devices.find((device) => device.deviceId === deviceId);
    if (!device) return res.status(402).send({ message: "Device not found" });

    user.devices = user.devices.filter(
      (device) => device.deviceId !== deviceId
    );
    await user.save();

    res.status(200).send({ message: "Device removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
