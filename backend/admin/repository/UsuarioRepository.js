// @ts-check

const Usuario = require("../Interfaces/UsuarioInterface");
const pool = require("../../models/db");

class UsuarioRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Usuario[]>}
   */
  async listarUsuarios(pagina, limite) {
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
  }

  /**
   * @param {number} id
   * @return {Promise<Usuario|null>}
   */
  async obterUsuarioPorId(id) {
    const [rows] = await pool.query(
      `SELECT id_usuario, nome, email, senha, data_criacao FROM usuarios WHERE id_usuario = ?`,
      [id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return new Usuario(rows[0]);
    } else {
      return null;
    }
  }

  /**
   * @param {Usuario} usuario
   * @return {Promise<number|null>}
   */
  async criarUsuario(usuario) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [result] = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, data_criacao)
     VALUES (?, ?, ?, ?)`,
        [
          usuario.nome,
          usuario.email,
          usuario.senha,
          usuario.data_criacao,
        ]
      );
      if (result.insertId) {
        return result.insertId;
      }
      throw null;
    } catch (error) {
      throw null;
    }
  }

  /**
   * @param {Usuario} usuario
   * @return {Promise<number|null>}
   */
  async atualizarUsuario(usuario) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [updated] = await pool.query(
        `UPDATE usuarios SET nome = ?, email = ?, senha = ?, data_criacao = ? WHERE id_usuario = ?`,
        [
          usuario.nome,
          usuario.email,
          usuario.senha,
          usuario.data_criacao,
          usuario.id_usuario,
        ]
      );
      if (updated.affectedRows === 0) {
        return null;
      }
      return usuario.id_usuario ?? null;
    } catch (error) {
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
      return false;
    }
  }
}

module.exports = new UsuarioRepository();
