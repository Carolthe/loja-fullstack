// @ts-check

class ValidationError extends Error {
  status = 422;

  /**
   * @param {string} message
   * @param {number} [status]
   */
  constructor(message, status = 422) {
    super(message);
    this.status = status;
  }
}

module.exports = ValidationError;
