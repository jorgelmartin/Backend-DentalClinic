const authController = require('../controllers/authController');
const treatmentController = require('../controllers/treatmentController');
const isDentist = require('../middlewares/verifyRole');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, treatmentController.createTreatment)
router.put('/:id', auth, isDentist, treatmentController.updateTreatment)
router.delete('/:id', auth, isDentist, treatmentController.deleteTreatment)
router.get('/', auth, treatmentController.getAllTreatments)

module.exports = router;