import express from "express";
const router = express.Router();
import { User, validate } from "../../models/user.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

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
});
export default router;
