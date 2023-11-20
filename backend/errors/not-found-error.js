const { STATUSES } = require('../utils/statuses');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUSES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
