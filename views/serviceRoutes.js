const authController = require('../controllers/authController');
const serviceController = require('../controllers/serviceController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, serviceController.createService)
router.put('/:id', auth, isDentist, serviceController.updateService)
router.delete('/:id', auth, isDentist, serviceController.deleteService)
router.get('/', auth, serviceController.getAllServices)

module.exports = router;