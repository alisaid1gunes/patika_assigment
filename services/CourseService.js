const Course = require('../models/Course');
const MongooseService = require('./MongooseService');

const {
  courseValidationSave,
  courseValidationUpdate,
} = require('../validations/validations');

class CourseService {
  constructor() {
    this.mongooseCourse = new MongooseService(Course);
  }

  async GetId(id) {
    const idIn = id;

    try {
      const result = await this.mongooseCourse.get({ _id: idIn });
     
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
      const result = await this.mongooseCourse.getAll();
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

    const { error } = courseValidationSave(bodyIn);
    if (error) return error.details[0].message;
    try {
      const result = await this.mongooseCourse.save(bodyIn);
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
      const { error } = courseValidationUpdate(bodyIn);
      if (error) return error.details[0].message;

      const result = await this.mongooseCourse.update(id, bodyIn);
      if (result) return result;
    } catch (err) {
      return 'Kayıt edilemedi. Hata:' + err;
    }
  }

  async Delete(id) {
    try {
      await this.mongooseCourse.delete({ _id: id });
      return 'Kayıt silindi';
    } catch (err) {
      return 'hata kayıt silinemedi: ' + err;
    }
  }
}
module.exports = CourseService;
