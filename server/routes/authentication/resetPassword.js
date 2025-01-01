import express from "express";
const router = express.Router();
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const validate = (data) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }
    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const { error } = validate({ password: newPassword });

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
});

export default router;
