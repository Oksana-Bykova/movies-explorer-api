const router = require('express').Router();
const { UserNotFound } = require('../errors/not-found-err');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.use(userRoutes);
router.use(movieRoutes);

router.use('/*', (req, res, next) => {
  next(new UserNotFound());
});

module.exports = router;
