// @ts-check
const ValidationError = require("../../errors/ValidationError");

class CategoriaAtualizarInput {
  /**
   * @param {string} nome
   */
  nome;

  constructor({ nome }) {
    this.nome = nome;
  }

  /**
   * @param {Object} body
   * @return {CategoriaAtualizarInput}
   */
  static fromBody(body) {
    if (!body) {
      throw new ValidationError("Dados da categoria são obrigatórios");
    }
    if (typeof body.nome !== "string" || body.nome.trim() === "") {
      throw new ValidationError("Nome é obrigatório");
    }
    return new CategoriaAtualizarInput(body);
  }

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

module.exports = CategoriaAtualizarInput;
