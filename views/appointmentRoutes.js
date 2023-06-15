const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

//ROUTES
router.post('/create', auth, appointmentController.createAppointment)
router.put('/update/:id', auth, appointmentController.updateAppointment)
router.delete('/delete/:id', auth, appointmentController.deleteAppointment)
router.get('/getAll', auth, isAdmin, appointmentController.getAllAppointments)


module.exports = router;