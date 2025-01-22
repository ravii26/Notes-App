import { User } from "../models/user.js";
import { otpJwtToken } from "../utils/generateJwtToken.js";
import { validatePassword } from "../utils/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/sendEmail.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();

    const user = await User.findOneAndUpdate(
      { email },
      { otp: otp, otpExpiry: Date.now() + 10 * 60 * 1000 },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // await sendEmail(email, "Password Reset OTP", `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`);

    console.log(otp);

    const token = otpJwtToken(user);

    res.status(200).send({ token, message: "OTP sent to email", otp });
  } catch (error) {
    console.log(error);
    res.status(502).send({ message: "There is problem in server" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user._doc.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP or Email" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).send({ message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const resetToken = otpJwtToken(user);
    res
      .status(200)
      .send({ token: resetToken, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(502).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(404).send({ message: "User not found" });

    const { error } = validatePassword({ password: newPassword });

    if (error) {
      return res.status(400).send({ message: "error.details[0].message" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Invalid or expired token" });
  }
};

export { forgetPassword, verifyOtp, resetPassword };
