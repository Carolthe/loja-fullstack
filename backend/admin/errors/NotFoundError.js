class NotFoundError extends Error {
  status = 404;

  constructor(message, status = 404) {
    super(message);
    this.status = status;
  }
}

module.exports = NotFoundError;
