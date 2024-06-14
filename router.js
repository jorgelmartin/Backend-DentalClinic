const router = require('express').Router();

const authRoutes = require('./views/authRoutes');
const userRoutes = require('./views/userRoutes');
const serviceRoutes = require('./views/serviceRoutes');
const appointmentRoutes = require('./views/appointmentRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/service', serviceRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;

