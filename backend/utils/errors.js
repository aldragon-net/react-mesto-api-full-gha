const { STATUSES } = require('./statuses');
const { MESSAGES } = require('./messages');

const NotFoundError = require('../errors/not-found-error');
const AuthorizationError = require('../errors/auth-error');
const ForbiddenError = require('../errors/forbidden-error');
const DuplicateError = require('../errors/duplicate-error');
const BadRequestError = require('../errors/bad-request-error');

const handleError = ({ err, res }) => {
  const { statusCode = STATUSES.INTERNAL, message } = err;
  res.status(statusCode).send({
    message: statusCode === STATUSES.INTERNAL
      ? MESSAGES.INTERNAL
      : message,
  });
};

module.exports = {
  NotFoundError, BadRequestError, AuthorizationError, ForbiddenError, DuplicateError, handleError,
};
