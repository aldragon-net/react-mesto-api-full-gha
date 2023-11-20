const { Joi } = require('celebrate');
const { validLinkRegex } = require('./regexes');

module.exports.userCreationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validLinkRegex),
  }),
};

module.exports.profileUpdateSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.avatarUpdateSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(validLinkRegex).required(),
  }),
};

module.exports.userLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }),
};

module.exports.cardCreationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(validLinkRegex).required(),
  }),
};

module.exports.queryIdSchema = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
};
