const CourseEnrollment = require('../models/CourseEnrollment');

const Score = require('../models/Score');

const MongooseService = require('./MongooseService');

const {
  courseEnrollmentValidationSave,
  courseEnrollmentValidationUpdate,
} = require('../validations/validations');

class CourseEnrollmentService {
  constructor() {
    this.mongooseCourseEnrollment = new MongooseService(CourseEnrollment);
    this.mongooseScore = new MongooseService(Score);
  }

  async GetId(id) {
    const idIn = id;

    try {
      const result = await this.mongooseCourseEnrollment.get({ _id: idIn });

      if (result) {
        return result;
      } else {
        return 'kayıt bulunamadı';
      }
    } catch (err) {
      return 'Kayıt bulunamadı. Hata:' + err;
    }
  }

  async GetAll(body) {
    try {
      const result = await this.mongooseCourseEnrollment.getAll();
      if (result.length > 0) {
        return result;
      } else {
        return 'Hiç kayıt yok';
      }
    } catch (err) {
      return 'Kayıt bulunamadı. Hata:';
    }
  }

  async Save(body) {
    const bodyIn = body;

    const { error } = courseEnrollmentValidationSave(bodyIn);
    if (error) return error.details[0].message;
    try {
      const result = await this.mongooseCourseEnrollment.save(bodyIn);
      let score = await this.mongooseScore.get({ userId: bodyIn.userId });

      if (score == null) {
        score = await this.mongooseScore.save({
          userId: bodyIn.userId,
          totalPoints: 0,
          history: [{ point: 0, date: new Date(), courseId: bodyIn.courseId }],
        });
      }

      score.totalPoints += 2;
      score.history.push({
        point: 2,
        date: new Date(),
        courseId: bodyIn.courseId,
      });
      await this.mongooseScore.updateWithUser(bodyIn.userId, score);

      if (result) {
        return 'kayıt yapıldı 2 puan kazandın';
      } else {
        return 'kayıt yapılamadı';
      }
    } catch (err) {
      res.json('Kayıt edilemedi. Hata:' + err);
    }
  }

  async Update(body, id) {
    const bodyIn = body;
    try {
      const { error } = courseEnrollmentValidationUpdate(bodyIn);
      if (error) return error.details[0].message;

      let score = await this.mongooseScore.get({ userId: bodyIn.userId });
      if (score == null) {
        score = await this.mongooseScore.save({
          userId: bodyIn.userId,
          totalPoints: 0,
          history: [{ point: 0, date: new Date(), courseId: bodyIn.courseId }],
        });
      }

      if ((bodyIn.isCourseCompleted = !null)) {
        if (bodyIn.isCourseCompleted) {
          console.log(score);
          score.totalPoints += 10;
          score.history.push({
            point: 10,
            date: new Date(),
            courseId: bodyIn.courseId,
          });
          await this.mongooseScore.updateWithUser(bodyIn.userId, score);
        }
      }

      if (bodyIn.isALessonCompleted != null) {
        if (bodyIn.isALessonCompleted) {
          score.totalPoints += 1;
          score.history.push({
            point: 1,
            date: new Date(),
            courseId: bodyIn.courseId,
          });
          await this.mongooseScore.updateWithUser(bodyIn.userId, score);
        }
      }
      const result = await this.mongooseCourseEnrollment.update(id, bodyIn);
      if (result) return result;
    } catch (err) {
      return 'Kayıt edilemedi. Hata:' + err;
    }
  }

  async Delete(id) {
    try {
      await this.mongooseCourseEnrollment.delete({ _id: id });
      return 'Kayıt silindi';
    } catch (err) {
      return 'hata kayıt silinemedi: ' + err;
    }
  }
}
module.exports = CourseEnrollmentService;
