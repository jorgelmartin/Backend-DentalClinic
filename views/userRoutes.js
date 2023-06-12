const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', auth, isDentist, userController.createUser)
router.put('/update/:id', auth, isDentist, userController.updateUser)
router.delete('/delete/:id', auth, isDentist, userController.deleteUser)
router.get('/getAll', userController.getAllUsers)
router.get('/getUser/:id', userController.getUser);

module.exports = router;