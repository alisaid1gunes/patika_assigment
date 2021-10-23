const router = require('express').Router();

const authController = require('../controllers/authController');
// eslint-disable-next-line consistent-return
router.post('/token', authController.refresh);

module.exports = router;
