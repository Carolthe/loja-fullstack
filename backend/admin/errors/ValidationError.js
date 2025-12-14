class ValidationError extends Error {
  status = 422;

  constructor(message, status = 422) {
    super(message);
    this.status = status;
  }
}

module.exports = ValidationError;
