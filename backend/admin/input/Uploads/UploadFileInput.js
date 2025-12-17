// @ts-check

const ValidationError = require("../../errors/ValidationError");

class UploadsFileInput {
  /**
   * @param {import("express").Request} req
   * @returns {Express.Multer.File}
   */
  static fromRequest(req) {
    const file = req.file;
    if (!file) {
      throw new ValidationError("Nenhum arquivo recebido");
    }
    return file;
  }
}

module.exports = UploadsFileInput;
