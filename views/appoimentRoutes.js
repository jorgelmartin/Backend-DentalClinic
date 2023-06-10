const authController = require('../controllers/authController');
const appoimentController = require('../controllers/appoimentController');
const isDentist = require('../middlewares/verifyRole');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, appoimentController.createAppoiment)
router.put('/:id', auth, isDentist, appoimentController.updateAppoiment)
router.delete('/:id', auth, isDentist, appoimentController.deleteAppoiment)
router.get('/', auth, appoimentController.getAllAppoiments)

module.exports = router;