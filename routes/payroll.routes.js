const router = require('express').Router();
const c = require('../controllers/payroll.controller');

router.get('/',              c.getAll);
router.post('/',             c.create);
router.patch('/:id/approve', c.approve);
router.delete('/:id',        c.reject);

module.exports = router;