const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/isAdmin.js');
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

router.put('/update/:id', auth, userController.updateUser)
router.delete('/delete/:id', auth, userController.deleteUser)
router.get('/getAll', auth, isAdmin, userController.getAllUsers)
router.get('/getUser/:id', auth, userController.getUser)
router.get('/getAll/:id', userController.getAllAppointmentsByUser)

module.exports = router;