const authController = require('../controllers/authController');
const treatmentController = require('../controllers/treatmentController');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isAdmin, treatmentController.createTreatment)
router.put('/:id', auth, isAdmin, treatmentController.updateTreatment)
router.delete('/:id', auth, isAdmin, treatmentController.deleteTreatment)
router.get('/', auth, treatmentController.getAllTreatments)

module.exports = router;