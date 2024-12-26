import express from "express";
import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";
const router = express.Router();
import jwt from "jsonwebtoken";
import Joi from "joi";

const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const token = req.body.headers.Authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "sadsfdsfaffsc3332rfa3");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: "User not found" });

    const { error } = validate({ title, description });
    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }
    const note = await Note.create({
      title,
      description,
      user: user._id,
      category,
    });

    res.status(201).send({ message: "Note created successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "There is problem in server" });
  }
});

export default router;
