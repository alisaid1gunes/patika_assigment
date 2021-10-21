const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    require: true,
  },
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);
