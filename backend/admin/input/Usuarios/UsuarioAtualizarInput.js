// @ts-check
const ValidationError = require("../../errors/ValidationError");

class UsuarioAtualizarInput {
  /**
   * @param {string} nome
   */
  nome;

  /**
   * @param {string} email
   */
  email;

  /**
   * @param {string} senha
   */
  senha;

  constructor({ nome, email, senha }) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  /**
   * @param {Object} body
   * @return {UsuarioAtualizarInput}
   */
  static fromBody(body) {
    if (!body) {
      throw new ValidationError("Dados do usuario são obrigatórios");
    }
    if (typeof body.nome !== "string" || body.nome.trim() === "") {
      throw new ValidationError("Nome é obrigatório");
    }
    if (typeof body.email !== "string" || body.email.trim() === "") {
      throw new ValidationError("Email é obrigatório");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw new ValidationError("Email inválido");
    }
    if (typeof body.senha !== "string" || body.senha.trim() === "") {
      throw new ValidationError("Senha é obrigatória");
    }
    return new UsuarioAtualizarInput(body);
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

module.exports = UsuarioAtualizarInput;
