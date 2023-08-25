const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middlwares/validation');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signup',
  validateSignup,
  createUser,
);

router.post(
  '/signin',
  validateSignin,
  login,
);

module.exports = router;
