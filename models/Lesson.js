const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  isPublished: {
    type: Boolean,
    default: false,
    require: true,
  },
  title: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  url: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  body: {
    type: String,
    require: true,
  },
});

LessonSchema.set('timestamps', true);

module.exports = mongoose.model('Lesson', LessonSchema);
