const Lesson = require('../models/Lesson');

const {
  lessonValidationSave,
  lessonValidationUpdate,
} = require('../validations/validations');

const LessonService = require('../services/LessonService');

const LessonServiceInstance = new LessonService();

const get = async (req, res) => {
  try {
    const result = await LessonServiceInstance.GetId(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json('Kayıt bulunamadı. Hata:' + err);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await LessonServiceInstance.GetAll();
    res.json(result);
  } catch (err) {
    res.status(404).json('Kayıtlar bulunamadı. Hata:' + err);
  }
};

const save = async (req, res) => {
  try {
    const result = await LessonServiceInstance.Save(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Kayıt edilemedi. Hata:' + err);
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await LessonServiceInstance.Update(req.body, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Güncellenemedi. Hata:' + err);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await LessonServiceInstance.Delete(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Silinemedi. Hata:' + err);
  }
};

module.exports = {
  get,
  getAll,
  save,
  update,
  remove,
};
