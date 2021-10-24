class MongooseService {
  constructor(model) {
    this.model = model;
  }

  save(body) {
    return this.model.create(body);
  }

  get(object) {
    return this.model.findOne(object);
  }

  getAll() {
    return this.model.find({});
  }

  getEmail(email) {
    return this.model.findOne({ email: email });
  }

  delete(object) {
    console.log(object);
    return this.model.findOneAndDelete(object);
  }

  update(id, value) {
    return this.model.findOneAndUpdate({ _id: id }, value);
  }
  updateWithUser(id, value) {
    return this.model.findOneAndUpdate({userId: id }, value);
  }
}

module.exports = MongooseService;
