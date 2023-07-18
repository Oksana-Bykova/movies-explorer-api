const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { RegURL } = require('../utils/constants');

const idValid = celebrate({
  params: Joi.object().keys({
    moviesId: Joi.string().length(24).hex().required(),
  }),
});

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(RegURL),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(RegURL),
      trailer: Joi.string().required().regex(RegURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().regex(RegURL),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

router.delete('/movies/:moviesId', idValid, deleteMovie);

module.exports = router;
