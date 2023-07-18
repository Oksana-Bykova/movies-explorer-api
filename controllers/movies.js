const Movie = require('../models/movie');
const { UserNotFound } = require('../errors/not-found-err');
const { BadRequest } = require('../errors/bad-request');
const { Forbidden } = require('../errors/forbidden');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => Movie.findById(req.params.cardId)
  .then((movie) => {
    if (!movie) {
      next(new UserNotFound());
      return;
    }

    if (!movie.owner.equals(req.user._id)) {
      next(new Forbidden());
      return;
    }
    movie.deleteOne()
      .then(() => res.status(200).send({ message: 'Фильм успешно удален' }))
      .catch(next);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest());
    } else {
      next(err);
    }
  });

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
