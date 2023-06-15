
const roleController = require('../controllers/roleController');
const isAdmin = require('../middlewares/isAdmin')
const auth = require('../middlewares/verifyToken');
const router = require('express').Router();

//ROUTES
router.post('/create', auth, isAdmin, roleController.createRole)
router.put('/update/:id', auth, isAdmin, roleController.updateRole)
router.delete('/delete/:id', auth, isAdmin, roleController.deleteRole)
router.get('/getAll', auth, isAdmin, roleController.getAllRoles)

module.exports = router;