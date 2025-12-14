// @ts-check
const ValidationError = require("../../errors/ValidationError");

class UsuarioDeletarInput {
  /**
   * @param {{ id?: number }} params
   */
  static fromParams({ id }) {
    const idNumber = Number(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new ValidationError("ID inválido");
    }
    return idNumber;
  }
}

module.exports = UsuarioDeletarInput;
