const accessLogsController = require('../controllers/accessLogController');
const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin.js');
const auth = require('../middlewares/verifyToken');

//ROUTES
router.get('/searchAccessLogs', auth, isAdmin, accessLogsController.searchAccessLogs)

module.exports = router;