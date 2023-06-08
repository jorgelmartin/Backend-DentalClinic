const authController = require('../controllers/authController');
const appoimentController = require('../controllers/appoimentController');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isAdmin, appoimentController.createAppoiment)
// router.put('/:id', auth, isAdmin, appoimentController.updateAppoiment)
// router.delete('/:id', auth, isAdmin, appoimentController.deleteAppoiment)
// router.get('/', auth, appoimentController.getAllAppoiments)

module.exports = router;