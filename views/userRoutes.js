
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/isAdmin.js');
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

//ROUTES
router.put('/update', auth, userController.updateUser)
router.get('/getAllUsers', auth, isAdmin, userController.getAllUsers)
router.get('/getUser', auth, userController.getUser)
router.get('/getUserDetails/:id', auth, isAdmin, userController.getUserDetailsForAdmin)
router.get('/getDentists', auth, userController.getAllDentists)


module.exports = router;