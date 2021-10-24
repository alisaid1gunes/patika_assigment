const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const completedLessonsSchema = new mongoose.Schema({
  lessonId: {
    type: ObjectId,
    ref: 'Lesson',
    require: true,
  },
});

const CourseEnrollmentSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    require: true,
  },
  courseId: {
    type: ObjectId,
    ref: 'Course',
    require: true,
  },
  isCourseCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  lastVisitedLesson: {
    type: ObjectId,
    ref: 'Lesson',
    require: true,
  },
  lastCompletedLesson: {
    type: ObjectId,
    ref: 'Lesson',
    require: true,
  },
  completedLessons: [completedLessonsSchema],
});

CourseEnrollmentSchema.set('timestamps', true);

module.exports = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);
