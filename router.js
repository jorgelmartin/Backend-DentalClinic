const router = require('express').Router();
const accessLogMiddleware = require('./middlewares/accessLogMiddleware');
const globalRateLimit = require("./middlewares/globalRateLimit");

const authRoutes = require('./views/authRoutes');
const userRoutes = require('./views/userRoutes');
const serviceRoutes = require('./views/serviceRoutes');
const appointmentRoutes = require('./views/appointmentRoutes');
const accessLogRoutes = require('./views/accessLogRoutes');

router.use(accessLogMiddleware);
router.use(globalRateLimit);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/service', serviceRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/accessLog', accessLogRoutes);

module.exports = router;

