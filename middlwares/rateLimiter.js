const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  max: 5,
  windowMS: 10000, // 10 seconds
  message: 'Слишком много запросов. Пожалуйста, попробуйте позже.',
});

module.exports = rateLimiter;
