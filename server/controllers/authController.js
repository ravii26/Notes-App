import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import generatePassword from "../utils/passwordGenerator.js";

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

    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    res
      .status(200)
      .send({ message: "User created successfully", user: newUser });
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

    const token = await generateJwtToken(user, deviceId);
    res.status(200).send({ data: token, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(502).send({ message: error.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { code, deviceId } = req.body;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture, given_name, family_name } = userRes.data;
    let user = await User.findOne({ email });
    if (user) {
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
          deviceName: "Chrome",
          lastLogin: new Date(),
        });
      } else {
        existingDevice.lastLogin = new Date();
      }
      await user.save();
    }
    const password = generatePassword();
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      if (!given_name) given_name = "";
      if (!family_name) family_name = "";

      user = await new User({
        firstName: given_name,
        lastName: family_name,
        email,
        password: hashedPassword,
      }).save();

      if (user.devices.length >= 5) {
        return res.status(403).json({
          message:
            "Device limit reached. Please remove an old device to proceed.",
        });
      }
      user.devices.push({
        deviceId,
        deviceName: "Chrome",
        lastLogin: new Date(),
      });
      await user.save();
    }
    const token = await generateJwtToken(user, deviceId);
    res.status(200).send({ data: token, message: "Login Successful" });
  } catch (err) {
    console.error(err);
    res.status(501).send("SERVER ERROR");
  }
};

export { register, login, googleAuth };
