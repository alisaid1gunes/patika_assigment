const router = require('express').Router();

const lessonController = require('../controllers/lessonController');

const verify = require('../middlewares/verifyToken');

router.get('/:id', verify, lessonController.get);

router.get('/', verify, lessonController.getAll);

router.post('/', verify, lessonController.save);

router.put('/:id', verify, lessonController.update);

router.delete('/:id', verify, lessonController.remove);

module.exports = router;
