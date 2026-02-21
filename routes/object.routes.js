const router = require('express').Router();
const c = require('../controllers/object.controller');

router.get('/',             c.getAll);
router.post('/',            c.create);
router.delete('/:id',       c.remove);
router.patch('/:id/spent',  c.addSpent);
router.patch('/:id/income', c.addIncome);

module.exports = router;