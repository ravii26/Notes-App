import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now },
  deviceName: { type: String },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isAdmin: { type: Boolean, default: false },
  profileImage: { type: String },
  devices: [deviceSchema],
});

userSchema.methods.generateAuthToken = function (deviceId) {
  const token = jwt.sign({ _id: this._id, deviceId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { User, validate };
