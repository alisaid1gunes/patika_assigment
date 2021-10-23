const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    max: 8,
  },
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);
