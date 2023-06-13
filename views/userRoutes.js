const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', auth, isAdmin, userController.createUser)
router.put('/update/:id', auth, userController.updateUser)
router.delete('/delete/:id', auth, userController.deleteUser)
router.get('/getAll', auth, userController.getAllUsers)
router.get('/getUser/:id', userController.getUser);
router.get('/getAll/:id', userController.getAllAppointmentByUser)

module.exports = router;