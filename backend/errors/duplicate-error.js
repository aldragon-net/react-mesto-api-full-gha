const { STATUSES } = require('../utils/statuses');

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUSES.CONFLICT;
  }
}

module.exports = DuplicateError;
