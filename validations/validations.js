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

const courseEnrollmentValidationSave = (data) => {
  const courseEnrollmentSchema = Joi.object({
    userId: Joi.objectId().required(),
    courseId: Joi.objectId().required(),
    lastVisitedLesson: Joi.objectId().required(),
    lastCompletedLesson: Joi.objectId().required(),
    completedLessons: Joi.array()
      .items({
        lessonId: Joi.objectId(),
      })
      .required(),
  });

  return courseEnrollmentSchema.validate(data);
};

const courseEnrollmentValidationUpdate = (data) => {
  const courseEnrollmentSchema = Joi.object({
    userId: Joi.objectId(),
    courseId: Joi.objectId(),
    lastVisitedLesson: Joi.objectId(),
    lastCompletedLesson: Joi.objectId(),
    completedLessons: Joi.array().items({
      lessonId: Joi.objectId(),
    }),
  });

  return courseEnrollmentSchema.validate(data);
};

const scoreValidationSave = (data) => {
  const scoreSchema = Joi.object({
    userId: Joi.objectId().required(),
    totalPoints: Joi.number().required(),
    lastVisitedLesson: Joi.objectId().required(),
    lastCompletedLesson: Joi.objectId().required(),
    history: Joi.array()
      .items({
        point: Joi.number().required(),
        date: Joi.date().required(),
        courseId: Joi.objectId().required(),
        lessonId: Joi.objectId().required(),
      })
      .required(),
  });

  return scoreSchema.validate(data);
};

const scoreValidationUpdate = (data) => {
  const scoreSchema = Joi.object({
    userId: Joi.objectId(),
    courseId: Joi.objectId(),
    lastVisitedLesson: Joi.objectId(),
    lastCompletedLesson: Joi.objectId(),
    completedLessons: Joi.array().items({
      lessonId: Joi.objectId(),
    }),
  });

  return scoreSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.courseValidationSave = courseValidationSave;
module.exports.courseValidationUpdate = courseValidationUpdate;

module.exports.lessonValidationSave = lessonValidationSave;
module.exports.lessonValidationUpdate = lessonValidationUpdate;

module.exports.courseEnrollmentValidationSave = courseEnrollmentValidationSave;
module.exports.courseEnrollmentValidationUpdate =
  courseEnrollmentValidationUpdate;

module.exports.scoreValidationSave = scoreValidationSave;
module.exports.scoreValidationUpdate = scoreValidationUpdate;
