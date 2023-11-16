const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { AuthorizationError } = require('../utils/errors');
const { validLinkRegex } = require('../utils/regexes');
const { MESSAGES } = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле "email" должно содержать корректный e-mail',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validLinkRegex.test(v),
      message: 'Поле "avatar" должно содержать корректный URL',
    },
  },
  __v: {
    type: Number,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(MESSAGES.AUTH_FAIL));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError(MESSAGES.AUTH_FAIL));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
