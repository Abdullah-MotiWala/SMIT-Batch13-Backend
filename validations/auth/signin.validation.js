const Joi = require("joi");

const signinSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { signinSchema };
