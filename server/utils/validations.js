import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const validateRegister = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      email: Joi.string().email().required().label("Email"),
      password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

const validateEmail = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
}

const validatePassword = (data) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const validateNote = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
  });
  return schema.validate(data);
};


export { validateRegister, validateLogin, validateEmail, validatePassword, validateNote };