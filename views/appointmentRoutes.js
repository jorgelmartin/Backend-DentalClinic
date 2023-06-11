const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, appointmentController.createAppointment)
router.put('/:id', auth, isDentist, appointmentController.updateAppointment)
router.delete('/:id', auth, isDentist, appointmentController.deleteAppointment)
router.get('/', auth, appointmentController.getAllAppointments)

module.exports = router;