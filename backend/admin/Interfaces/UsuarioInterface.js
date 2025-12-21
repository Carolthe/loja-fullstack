// @ts-check
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const InternalServerError = require("../errors/InternalServerError");
const LogError = require("../utils/LogError");
const ValidationError = require("../errors/ValidationError");

class Usuario {
  /**
   * @type {number|undefined}
   */
  id_usuario;

  /**
   * @type {string}
   */
  nome;

  /**
   * @type {string|undefined}
   */
  email;

  /**
   * @type {string|undefined}
   */
  senha;

  /**
   * @type {Date|undefined}
   */
  data_criacao;

  constructor(usuario) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.data_criacao = usuario.data_criacao;
    this.id_usuario = usuario.id_usuario;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Usuario(row);
  }

  async hashPassword() {
    const saltValue = process.env.SALT_ROUNDS || "10";
    const saltRounds = parseInt(saltValue, 10);
    if (!this.senha) {
      throw new ValidationError("Senha não definida para hash");
    }
    this.senha = await bcrypt.hash(this.senha, saltRounds);
  }

  async comparePassword(password) {
    if (!this.senha) {
      return false;
    }
    return await bcrypt.compare(password, this.senha);
  }

  generateJWT() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      LogError.log(
        new Error("JWT_SECRET não está definido"),
        "Usuario.generateJWT"
      );
      throw new InternalServerError("Erro desconhecido");
    }
    return jwt.sign(
      {
        id_usuario: this.id_usuario,
        nome: this.nome,
        email: this.email,
      },
      secret,
      { expiresIn: "24h" }
    );
  }
}

module.exports = Usuario;
