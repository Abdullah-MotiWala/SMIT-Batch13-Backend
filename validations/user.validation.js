const Joi = require("joi");

const createUserSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  age: Joi.number().min(18).max(100).required(),
  status: Joi.boolean().required(),
  email: Joi.string().email().required(),
  qualification: Joi.array()
    .min(1)
    .max(5)
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    ),
});

module.exports = { createUserSchema };
