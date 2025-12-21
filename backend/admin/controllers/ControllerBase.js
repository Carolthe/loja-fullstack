// @ts-check
const InternalServerError = require("../errors/InternalServerError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ValidationError = require("../errors/ValidationError");

class ControllerBase {
  constructor() {}

  /**
   * @param {import("express").Response} res
   * @param {ValidationError|Error} error
   */
  handleError(res, error) {
    if (error instanceof ValidationError) {
      return res.status(error.status).json({ validationError: error.message });
    }
    if (error instanceof InternalServerError) {
      return res.status(error.status).json({ error: error.message });
    }
    if (error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }
    if (error instanceof UnauthorizedError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro desconhecido" });
  }
}

module.exports = ControllerBase;
