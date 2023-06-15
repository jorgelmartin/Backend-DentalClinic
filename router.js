const router = require('express').Router();

const authRoutes = require('./views/authRoutes');
const userRoutes = require('./views/userRoutes');
const roleRoutes = require('./views/roleRoutes');
const serviceRoutes = require('./views/serviceRoutes');
const appointmentRoutes = require('./views/appointmentRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/service', serviceRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;

