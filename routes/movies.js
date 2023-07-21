const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, idValid } = require('../middlwares/validation');

router.get('/', getMovies);

router.post(
  '/',
  validateCreateMovie,
  createMovie,
);

router.delete('/:moviesId', idValid, deleteMovie);

module.exports = router;
