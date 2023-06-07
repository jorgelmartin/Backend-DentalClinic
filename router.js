const router = require('express').Router();
const authRoutes = require('./views/authRoutes');
const roleRoutes = require('./views/roleRoutes');
const treatmentRoutes = require('./views/treatmentRoutes');

router.use('/auth', authRoutes);
// router.use('/role', roleRoutes);

module.exports = router;