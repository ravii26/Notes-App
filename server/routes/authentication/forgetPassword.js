import express from "express";
const router = express.Router();
import { User } from "../../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Joi from "joi";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: "zalaravindrasinh026@gmail.com", pass: "yxqs agvn ivru lwuq" },
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });

  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const otp = generateOTP();
    const user = await User.findOneAndUpdate(
      { email },
      { otp: otp, otpExpiry: Date.now() + 10 * 60 * 1000 },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await transporter.sendMail({
      from: "zalaravindrasinh026@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
    });
    console.log(otp);

    const token = jwt.sign({ id : user._id }, "sadsfdsfaffsc3332rfa3", {
      expiresIn: "15m",
    });
    res.status(200).send({ token, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.status(502).send({ message: "There is problem in server" });
  }
});

export default router;
