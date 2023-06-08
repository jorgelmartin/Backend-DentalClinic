const router = require('express').Router();
const authRoutes = require('./views/authRoutes');
const userRoutes = require('./views/userRoutes');
const roleRoutes = require('./views/roleRoutes');
const treatmentRoutes = require('./views/treatmentRoutes');
const appoimentRoutes = require('./views/appoimentRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/treatment', treatmentRoutes);
router.use('/appoiment', appoimentRoutes);

module.exports = router;

