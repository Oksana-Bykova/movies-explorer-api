const router = require('express').Router();

const {
  getUsers,
  updateProfile,
  getUserMe,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../middlwares/validation');

router.get('/users', getUsers);

router.get('/users/me', getUserMe);

router.patch(
  '/users/me',
  validateUpdateProfile,
  updateProfile,
);

module.exports = router;
