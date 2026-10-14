const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("candidate", "recruiter").required(),
});

const validateMiddleware = (req, res, next) => {
  const validate = userSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details[0].message,
    });
  }
  next();
};
module.exports = validateMiddleware;

// req.body
//    ↓
// Joi validates it
//    ↓
// Error? → 400 response
//    ↓
// No error? → next()
