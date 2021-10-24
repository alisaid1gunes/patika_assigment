const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RefreshToken = require('../models/RefreshToken');

const {
  registerValidation,
  loginValidation,
} = require('../validations/validations');

const AuthService = require('../services/AuthService');

const AuthServiceInstance = new AuthService();

const register = async (req, res) => {
  try {
    const result = await AuthServiceInstance.RegisterUser(req.body);
    if (result) res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const result = await AuthServiceInstance.LoginUser(req.body);

    if (result) {
      const accessToken = result.accessToken;
      const refreshToken = result.refreshToken;
      return res
        .header('auth-token', accessToken)
        .send({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const logout = async (req, res) => {
  try {
    const result = await AuthServiceInstance.LogoutUser(req.body);

    if (result) res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
const refresh = async (req, res) => {
  try {
    const result = await AuthServiceInstance.Refresh(req.body);

    if (result) res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
};
