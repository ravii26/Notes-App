import jwt from "jsonwebtoken";

export const generateJwtToken = async (user, deviceId) => {
  const token = await jwt.sign({ _id: user._id, deviceId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const otpJwtToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
}
