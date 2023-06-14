const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');
const isAdmin = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create/:id', appointmentController.createAppointment)
router.put('/update/:id', appointmentController.updateAppointment)
router.delete('/delete/:id', appointmentController.deleteAppointment)
router.get('/getAll', appointmentController.getAllAppointments)


module.exports = router;