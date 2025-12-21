// @ts-check

const ValidationError = require("../../errors/ValidationError");

class RegisterInput {
  nome;

  email;

  senha;

  constructor({ nome, email, senha }) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static fromBody(body) {
    if (!body) {
      throw new ValidationError("O corpo da requisição é obrigatório.");
    }

    const nome = body.nome;
    const email = body.email;
    const senha = body.senha;

    if (!nome) {
      throw new ValidationError("O campo 'nome' é obrigatório.");
    }

    if (!email) {
      throw new ValidationError("O campo 'email' é obrigatório.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      throw new ValidationError(
        "O campo 'email' deve ser um endereço de email válido."
      );
    }

    if (!senha) {
      throw new ValidationError("O campo 'senha' é obrigatório.");
    }

    return new RegisterInput({ nome, email, senha });
  }
}

module.exports = RegisterInput;
