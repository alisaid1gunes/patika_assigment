const CourseEnrollment = require('../models/CourseEnrollment');
const MongooseService = require('./MongooseService');

const {
  courseEnrollmentValidationSave,
  courseEnrollmentValidationUpdate,
} = require('../validations/validations');

class CourseEnrollmentService {
  constructor() {
    this.mongooseCourseEnrollment = new MongooseService(CourseEnrollment);
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
      console.log(result);
      if (result) {
        return 'kayıt yapıldı';
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
