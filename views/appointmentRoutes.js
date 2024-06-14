
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

//ROUTES
router.post('/createAppointment', auth, appointmentController.createAppointment)
router.put('/update/:id', auth, appointmentController.updateAppointment)
router.delete('/delete/:id', auth, appointmentController.deleteAppointment)
router.get('/getAll', auth, appointmentController.getAllAppointments)
router.get('/getAppointmentById/:id', auth, appointmentController.getAppointmentById)
router.get('/getHours', auth, appointmentController.getHours)

module.exports = router;