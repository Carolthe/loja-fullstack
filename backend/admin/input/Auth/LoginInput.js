// @ts-check

const ValidationError = require("../../errors/ValidationError");

class LoginInput {
  email;

  password;

  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  static fromBody(body) {
    if (!body) {
      throw new ValidationError("O corpo da requisição é obrigatório.");
    }

    const email = body.email;
    const password = body.password;

    if (!email) {
      throw new ValidationError("O campo 'email' é obrigatório.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      throw new ValidationError(
        "O campo 'email' deve ser um endereço de email válido."
      );
    }

    if (!password) {
      throw new ValidationError("O campo 'password' é obrigatório.");
    }

    return new LoginInput({ email, password });
  }
}

module.exports = LoginInput;
