import express from 'express';
import { User } from '../../models/user.js';

import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).send({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, 'sadsfdsfaffsc3332rfa3');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ devices: user.devices });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;