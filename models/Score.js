const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const historySchema = new mongoose.Schema({
  point: {
    type: Number,
    min: 0,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  courseId: {
    type: ObjectId,
    ref: 'Course',
    require: true,
  },
  lessonId: {
    type: ObjectId,
    ref: 'Lesson',
    require: true,
  },
});

const scoreSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    require: true,
  },
  totalPoints: {
    type: Number,
    min: 0,
    require: true,
  },

  history: [historySchema],
});

scoreSchema.set('timestamps', true);

module.exports = mongoose.model('Score', scoreSchema);
