const router = require('express').Router();

const scoreController = require('../controllers/scoreController');

const verify = require('../middlewares/verifyToken');

router.get('/:id', verify, scoreController.get);

router.get('/', verify, scoreController.getAll);

router.post('/', verify, scoreController.save);

router.put('/:id', verify, scoreController.update);

router.delete('/:id', verify, scoreController.remove);

module.exports = router;
