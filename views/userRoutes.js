const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, userController.createUser)
router.put('/:id', auth, isDentist, userController.updateUser)
router.delete('/:id', auth, isDentist, userController.deleteUser)
router.get('/', auth, isDentist, userController.getAllUsers)

module.exports = router;