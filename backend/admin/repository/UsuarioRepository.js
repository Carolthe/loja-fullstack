// @ts-check

const Usuario = require("../Interfaces/UsuarioInterface");
const pool = require("../../models/db");
const InternalServerError = require("../errors/InternalServerError");
const LogError = require("../utils/LogError");

class UsuarioRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Usuario[]>}
   */
  async listarUsuarios(pagina, limite) {
    try {
      const [rows] = await pool.query(
        `SELECT id_usuario, nome, email, senha, data_criacao FROM usuarios LIMIT ? OFFSET ?`,
        [limite, (pagina - 1) * limite]
      );
      /**
       * @type {Usuario[]}
       */
      let usuarios = [];
      if (Array.isArray(rows)) {
        usuarios = rows.map(Usuario.fromDb);
      } else {
        usuarios = [];
      }
      return usuarios;
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao listar usuários");
    }
  }

  /**
   * @param {number} id
   * @return {Promise<Usuario|null>}
   */
  async obterUsuarioPorId(id) {
    try {
      const [rows] = await pool.query(
        `SELECT id_usuario, nome, email, senha, data_criacao FROM usuarios WHERE id_usuario = ?`,
        [id]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return new Usuario(rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      LogError.log(error, __filename);
      return null;
    }
  }

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  async removerUsuario(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await pool.query(
        `DELETE FROM usuarios WHERE id_usuario = ?`,
        [id]
      );
      if (removed.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      LogError.log(error, __filename);
      return false;
    }
  }
}

module.exports = new UsuarioRepository();
