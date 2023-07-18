const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateProfile,
  getUserMe,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserMe);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(3).max(30),
    }),
  }),
  updateProfile,
);

module.exports = router;