const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie } = require('../middlwares/validation');

router.get('/', getMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:moviesId', deleteMovie);

module.exports = router;
