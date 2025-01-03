import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";

const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(502).send({ message: "There is problem in server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, deviceId, browserName } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const existingDevice = user.devices.find((d) => d.deviceId === deviceId);

    if (!existingDevice) {
      if (user.devices.length >= 5) {
        return res.status(403).json({
          message:
            "Device limit reached. Please remove an old device to proceed.",
        });
      }
      user.devices.push({
        deviceId,
        deviceName: browserName,
        lastLogin: new Date(),
      });
    } else {
      existingDevice.lastLogin = new Date();
    }
    await user.save();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Password is invalid");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = generateJwtToken(user, deviceId);
    res.status(200).send({ data: token, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(502).send({ message: error.message });
  }
};

export { register, login };
