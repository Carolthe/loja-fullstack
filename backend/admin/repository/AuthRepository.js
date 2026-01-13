// @ts-check
const ligacao = require("../../models/db");
const InternalServerError = require("../errors/InternalServerError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const Usuario = require("../Interfaces/UsuarioInterface");
const LogError = require("../utils/LogError");

class AuthRepository {
  async getUserByEmail(email) {
    try {
      const [rows] = await ligacao.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
      if (Array.isArray(rows) && rows.length === 0) {
        return null;
      }
      return new Usuario(rows[0]);
    } catch (error) {
      LogError.log(error, __filename);
      return null;
    }
  }

  /**
   * @param {Usuario} user
   */
  async createUser(user) {
    try {
      const result = await ligacao.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [user.nome, user.email, user.senha]
      );
      // @ts-ignore
      if (result && result[0] && result[0].insertId) {
        return true;
      }
      return false;
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao criar usuário");
    }
  }
}

module.exports = new AuthRepository();
