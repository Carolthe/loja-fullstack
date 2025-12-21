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
  async listarUsuarios(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT id_usuario, nome, email, senha, data_criacao FROM usuarios WHERE nome LIKE ? LIMIT ? OFFSET ?`,
        [`${busca}%`, limite, (pagina - 1) * limite]
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

  async contarUsuarios(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT COUNT(*) as total FROM usuarios WHERE nome LIKE ?`,
        [`${busca}%`]
      );
      return {
        current_page: pagina,
        per_page: limite,
        total_items: rows[0].total,
        total_pages: Math.ceil(rows[0].total / limite),
      };
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao contar usuários");
    }
  }
}

module.exports = new UsuarioRepository();
