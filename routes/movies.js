const router = require('express').Router();

// const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, idValid } = require('../middlwares/validation');

router.get('/movies', getMovies);

router.post(
  '/movies',
  validateCreateMovie,
  createMovie,
);

router.delete('/movies/:moviesId', idValid, deleteMovie);

module.exports = router;
