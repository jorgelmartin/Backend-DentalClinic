const authController = require('../controllers/authController');
const serviceController = require('../controllers/serviceController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', serviceController.createService)
router.put('/update/:id', auth, isDentist, serviceController.updateService)
router.delete('/delete/:id', auth, isDentist, serviceController.deleteService)
router.get('/getAll', serviceController.getAllServices)

module.exports = router;