
const roleController = require('../controllers/roleController');
const isDentist = require('../middlewares/verifyRole');
const auth = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post('/', auth, isDentist, roleController.createRole)
router.put('/:id', auth, isDentist, roleController.updateRole)
router.delete('/:id', auth, isDentist, roleController.deleteRole)
router.get('/', auth, roleController.getAllRoles)

module.exports = router;