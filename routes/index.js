const router = require('express').Router();
const { UserNotFound } = require('../errors/not-found-err');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');

// const auth = require('../middlwares/auth');
// app.use(auth);
// router.use(authRoutes);
// router.use(userRoutes);
// router.use(movieRoutes);

const auth = require('../middlwares/auth');

router.use(authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('/*', (req, res, next) => {
  next(new UserNotFound());
});

module.exports = router;
