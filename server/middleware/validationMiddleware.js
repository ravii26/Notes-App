import {
  validateLogin,
  validateRegister,
  validateEmail,
} from "../utils/validations.js";

const registerValidator = async (req, res, next) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There is problem in server" });
  }
};

const loginValidator = async (req, res, next) => {
    try {
    const {email, password} = req.body;
    const { error } = validateLogin({ email, password });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There is problem in server" });
  }
};

const emailValidator = async (req, res, next) => {
    try {
    const { email } = req.body;
    const { error } = validateEmail({ email });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There is problem in server" });
  }
};

export { registerValidator, loginValidator, emailValidator };
