const Score = require('../models/Score');

const {
  scoreValidationSave,
  scoreValidationUpdate,
} = require('../validations/validations');

const ScoreService = require('../services/ScoreService');

const ScoreServiceInstance = new ScoreService();

const get = async (req, res) => {
  try {
    const result = await ScoreServiceInstance.GetId(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json('Kayıt bulunamadı. Hata:' + err);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await ScoreServiceInstance.GetAll();
    res.json(result);
  } catch (err) {
    res.status(404).json('Kayıtlar bulunamadı. Hata:' + err);
  }
};

const save = async (req, res) => {
  try {
    const result = await ScoreServiceInstance.Save(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Kayıt edilemedi. Hata:' + err);
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ScoreServiceInstance.Update(req.body, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Güncellenemedi. Hata:' + err);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ScoreServiceInstance.Delete(id);
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
