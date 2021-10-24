const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
  return jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1000s',
  });
};

module.exports.generateAccessToken = generateAccessToken;