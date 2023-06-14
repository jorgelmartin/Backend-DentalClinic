const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', userController.createUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getAll', userController.getAllUsers)
router.get('/getUser/:id', userController.getUser)
router.get('/getAll/:id', userController.getAllAppointmentByUser)

module.exports = router;