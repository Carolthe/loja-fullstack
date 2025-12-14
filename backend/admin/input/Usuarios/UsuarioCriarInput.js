// @ts-check
const ValidationError = require("../../errors/ValidationError");

class UsuarioCriarInput {
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

  /**
   * @param {Date} data_criacao
   *
   */
  data_criacao;

  constructor({ nome, email, senha }) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.data_criacao = new Date();
  }

  /**
   * @param {Object} body
   * @return {UsuarioCriarInput}
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
    return new UsuarioCriarInput(body);
  }
}

module.exports = UsuarioCriarInput;
