const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  lessonBody: {
    type: String,
    require: true,
  },
});

const courseSchema = new mongoose.Schema({
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
  content: [contentSchema],
});

courseSchema.set('timestamps', true);

module.exports = mongoose.model('Course', courseSchema);
