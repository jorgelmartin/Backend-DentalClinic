const serviceController = require('../controllers/serviceController');
const router = require('express').Router();

//ROUTES
router.get('/getAll', serviceController.getAllServices)

module.exports = router;