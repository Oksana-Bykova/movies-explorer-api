const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const { UserNotFound } = require('../errors/not-found-err');
const { BadRequest } = require('../errors/bad-request');
const { Unauthorized } = require('../errors/unauthorized');
const { ConflictingRequest } = require('../errors/conflicting-request');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new UserNotFound());
        return;
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      email,
      password: hashedPassword,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequest());
      } else if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new UserNotFound());
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequest());
      } else if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Unauthorized())
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jsonWebToken.sign({
              _id: user._id,
            }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
            res.status(200).send({ jwt: token });
          } else {
            next(new Unauthorized());
          }
        });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  updateProfile,
  login,
  getUserMe,
};
