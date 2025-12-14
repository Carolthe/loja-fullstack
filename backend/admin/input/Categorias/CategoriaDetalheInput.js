// @ts-check
const ValidationError = require("../../errors/ValidationError");

class CategoriaDetalheInput {
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

module.exports = CategoriaDetalheInput;
