const router = require('express').Router();

const {
  getUsers,
  updateProfile,
  getUserMe,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../middlwares/validation');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.patch(
  '/me',
  validateUpdateProfile,
  updateProfile,
);

module.exports = router;
