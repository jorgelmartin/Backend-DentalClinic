const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isAdmin, userController.createUser)
router.put('/:id', auth, isAdmin, userController.updateUser)
router.delete('/:id', auth, isAdmin, userController.deleteUser)
router.get('/', auth, userController.getAllUsers)

module.exports = router;