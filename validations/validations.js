const Joi = require('joi-oid');

const registerValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required(),
    password: Joi.string().max(8).required(),
  });
  return userSchema.validate(data);
};

const loginValidation = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().max(8).required(),
  });
  return loginSchema.validate(data);
};

const courseValidationSave = (data) => {
  const courseSchema = Joi.object({
    isPublished: Joi.boolean().required(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    content: Joi.array()
      .items({
        lessonId: Joi.objectId(),
      })
      .required(),
  });

  return courseSchema.validate(data);
};

const courseValidationUpdate = (data) => {
  const courseSchema = Joi.object({
    isPublished: Joi.boolean(),
    title: Joi.string(),
    url: Joi.string(),
    content: Joi.array().items({
      lessonId: Joi.objectId(),
    }),
  });

  return courseSchema.validate(data);
};

const lessonValidationSave = (data) => {
  const lessonSchema = Joi.object({
    isPublished: Joi.boolean().required(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    body: Joi.string().required(),
  });

  return lessonSchema.validate(data);
};

const lessonValidationUpdate = (data) => {
  const lessonSchema = Joi.object({
    isPublished: Joi.boolean(),
    title: Joi.string(),
    url: Joi.string(),
    body: Joi.string(),
  });

  return lessonSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidationSave = courseValidationSave;
module.exports.courseValidationUpdate = courseValidationUpdate;
module.exports.lessonValidationSave = lessonValidationSave;
module.exports.lessonValidationUpdate = lessonValidationUpdate;
