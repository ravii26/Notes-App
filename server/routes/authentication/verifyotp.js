import express from "express";
const router = express.Router();
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";


router.post("/", async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user || user._doc.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP or Email" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).send({ message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const resetToken = jwt.sign({ email }, "sadsfdsfaffsc3332rfa3", {
      expiresIn: "15m",
    });
    res
      .status(200)
      .send({ token: resetToken, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(502).send({ message: error.message });
  }
});

export default router;
