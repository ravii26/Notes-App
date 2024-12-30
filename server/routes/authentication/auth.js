import express from "express";
const router = express.Router();
import Joi from "joi";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { email, password, deviceId, browserName } = req.body;
    const { error } = validate({email, password});
    console.log(deviceId);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const existingDevice = user.devices.find((d) => d.deviceId === deviceId);

    if (!existingDevice) {
        if (user.devices.length >= 5) {
            return res.status(403).json({ message: 'Device limit reached. Please remove an old device to proceed.' });
        }
      user.devices.push({ deviceId, deviceName: browserName, lastLogin: new Date() });
    } else {
        existingDevice.lastLogin = new Date();
    }
    await user.save();

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken(deviceId);
    res.status(200).send({ data: token, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(502).send({ message: error.message });
  }
});

export default router;
