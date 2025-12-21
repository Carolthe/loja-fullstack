class UnauthorizedError extends Error {
  status = 401;

  constructor(message, status = 401) {
    super(message);
    this.status = status;
  }
}

module.exports = UnauthorizedError;
