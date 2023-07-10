const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/isAdmin.js');
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

//ROUTES
router.put('/update', auth, userController.updateUser)
router.delete('/delete/:id', auth, userController.deleteUser)
router.get('/getAllUsers', userController.getAllUsers)
router.get('/getUser', auth, userController.getUser)
router.get('/getAll/:id',auth,  userController.getAllAppointmentsByUser)

module.exports = router;