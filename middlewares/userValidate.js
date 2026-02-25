const joi = require("joi");
const { BadRequestError } = require("../errors");

const loginValidate = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(5).max(25).required(),
    email: joi.string().min(5).max(25).required().email(),
    password: joi.string().min(5).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};

module.exports = { registerValidate, loginValidate };
