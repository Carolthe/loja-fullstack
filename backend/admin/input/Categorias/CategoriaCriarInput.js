// @ts-check
const ValidationError = require("../../errors/ValidationError");

class CategoriaCriarInput {
  /**
   * @param {string} nome
   */
  nome;

  constructor({ nome }) {
    this.nome = nome;
  }

  /**
   * @param {Object} body
   * @return {CategoriaCriarInput}
   */
  static fromBody(body) {
    if (!body) {
      throw new ValidationError("Dados do produto são obrigatórios");
    }
    if (typeof body.nome !== "string" || body.nome.trim() === "") {
      throw new ValidationError("Nome é obrigatório");
    }
    return new CategoriaCriarInput(body);
  }
}

module.exports = CategoriaCriarInput;
