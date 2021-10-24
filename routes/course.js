const router = require('express').Router();

const courseController = require('../controllers/courseController');

const verify = require('../middlewares/verifyToken');

router.get('/:id', verify, courseController.get);

router.get('/', verify, courseController.getAll);

router.post('/', verify, courseController.save);

router.put('/:id', verify, courseController.update);

router.delete('/:id', verify, courseController.remove);

module.exports = router;
