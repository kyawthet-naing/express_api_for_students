const Joi = require("joi");

exports.contact_create = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  body: Joi.string().min(3).required(),
}).options({ allowUnknown: false });
