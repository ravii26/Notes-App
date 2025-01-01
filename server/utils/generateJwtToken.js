import jwt from "jsonwebtoken";

export const generateJwtToken = (user, deviceId) => {
  const token = jwt.sign({ _id: user._id, deviceId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const otpJwtToken = (id) => {
  const token = jwt.sign({ _id : id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
}
