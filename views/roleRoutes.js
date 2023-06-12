
const roleController = require('../controllers/roleController');
const isDentist = require('../middlewares/verifyDentist.js');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/create', auth, isDentist, roleController.createRole)
router.put('/update/:id', auth, isDentist, roleController.updateRole)
router.delete('/delete/:id', auth, isDentist, roleController.deleteRole)
router.get('/getAll', auth, roleController.getAllRoles)

module.exports = router;