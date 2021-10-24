const router = require('express').Router();

const courseEnrollmentController = require('../controllers/courseEnrollmentController');

const verify = require('../middlewares/verifyToken');

router.get('/:id', verify, courseEnrollmentController.get);

router.get('/', verify, courseEnrollmentController.getAll);

router.post('/', verify, courseEnrollmentController.save);

router.put('/:id', verify, courseEnrollmentController.update);

router.delete('/:id', verify, courseEnrollmentController.remove);

module.exports = router;
