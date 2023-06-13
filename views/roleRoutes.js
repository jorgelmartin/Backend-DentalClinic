
const roleController = require('../controllers/roleController');
const isAdmin = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', auth, isAdmin, roleController.createRole)
router.put('/update/:id', auth, isAdmin, roleController.updateRole)
router.delete('/delete/:id', auth, isAdmin, roleController.deleteRole)
router.get('/getAll', auth, roleController.getAllRoles)

module.exports = router;