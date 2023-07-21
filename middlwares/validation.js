const { celebrate, Joi } = require('celebrate');

const { RegURL } = require('../utils/constants');

const idValid = celebrate({
  params: Joi.object().keys({
    moviesId: Joi.string().length(24).hex().required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegURL),
    trailerLink: Joi.string().required().regex(RegURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(RegURL),
    movieId: Joi.number().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateMovie,
  idValid,
  validateUpdateProfile,
};
