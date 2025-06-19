const rateLimit = require('express-rate-limit');

const globalRateLimit = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutos
    max: 30, // Limit of 30 requests per window
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Returns rate limit info in standard headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers
});

module.exports = globalRateLimit;