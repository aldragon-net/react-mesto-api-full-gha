const { STATUSES } = require('../utils/statuses');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUSES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
