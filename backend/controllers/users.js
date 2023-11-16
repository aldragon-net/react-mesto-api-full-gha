const { isValidObjectId, Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, DuplicateError, NotFoundError } = require('../utils/errors');
const { STATUSES } = require('../utils/statuses');
const { MESSAGES } = require('../utils/messages');

const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-not-so-secret-key';

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res
      .status(STATUSES.CREATED)
      .send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicateError(MESSAGES.USER_EXISTS));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGES.BAD_USER_DATA));
      }
      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(new Error.CastError());
    return;
  }
  User.findById(req.params.id)
    .orFail(() => new NotFoundError(MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGES.BAD_USER_DATA));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGES.BAD_AVATAR_LINK));
      }
      return next(err);
    });
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ _id: user._id });
    })
    .catch(next);
};
