const authController = require('../controllers/authController');
const serviceController = require('../controllers/serviceController');
const isAdmin = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', serviceController.createService)
router.put('/update/:id', auth, isAdmin, serviceController.updateService)
router.delete('/delete/:id', auth, isAdmin, serviceController.deleteService)
router.get('/getAll', serviceController.getAllServices)

module.exports = router;