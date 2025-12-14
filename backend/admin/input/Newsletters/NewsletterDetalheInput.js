// @ts-check
const ValidationError = require("../../errors/ValidationError");

class NewsletterDetalheInput {
  /**
   * @param {{ id?: number }} params
   */
  static fromParams({ id }) {
    if (!id) {
      throw new ValidationError("ID é obrigatório");
    }
    const idNumber = Number(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new ValidationError("ID inválido");
    }
    return idNumber;
  }
}

module.exports = NewsletterDetalheInput;
