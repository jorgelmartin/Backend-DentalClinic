const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isAdmin, roleController.createRole)
router.put('/:id', auth, isAdmin, roleController.updateRole)
router.delete('/:id', auth, isAdmin, roleController.deleteRole)
router.get('/', auth, roleController.getAllRole)

module.exports = router;