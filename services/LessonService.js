const Lesson = require('../models/Lesson');
const MongooseService = require('./MongooseService');

const {
  lessonValidationSave,
  lessonValidationUpdate,
} = require('../validations/validations');

class LessonService {
  constructor() {
    this.mongooseLesson = new MongooseService(Lesson);
  }

  async GetId(id) {
    const idIn = id;

    try {
      const result = await this.mongooseLesson.get({ _id: idIn });
     
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
      const result = await this.mongooseLesson.getAll();
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

    const { error } = lessonValidationSave(bodyIn);
    if (error) return error.details[0].message;
    try {
      const result = await this.mongooseLesson.save(bodyIn);
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
      const { error } = lessonValidationUpdate(bodyIn);
      if (error) return error.details[0].message;

      const result = await this.mongooseLesson.update(id, bodyIn);
      if (result) return result;
    } catch (err) {
      return 'Kayıt edilemedi. Hata:' + err;
    }
  }

  async Delete(id) {
    try {
      await this.mongooseLesson.delete({ _id: id });
      return 'Kayıt silindi';
    } catch (err) {
      return 'hata kayıt silinemedi: ' + err;
    }
  }
}
module.exports = LessonService;
