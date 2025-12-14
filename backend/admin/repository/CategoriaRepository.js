// @ts-check

const Categoria = require("../Interfaces/CategoriaInterface");
const pool = require("../../models/db");

class CategoriaRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Categoria[]>}
   */
  async listarCategorias(pagina, limite) {
    const [rows] = await pool.query(
      `SELECT id_categoria, nome FROM categorias LIMIT ? OFFSET ?`,
      [limite, (pagina - 1) * limite]
    );
    /**
     * @type {Categoria[]}
     */
    let categorias = [];
    if (Array.isArray(rows)) {
      categorias = rows.map(Categoria.fromDb);
    } else {
      categorias = [];
    }
    return categorias;
  }

  /**
   * @param {number} id
   * @return {Promise<Categoria|null>}
   */
  async obterCategoriaPorId(id) {
    const [rows] = await pool.query(
      `SELECT id_categoria, nome FROM categorias WHERE id_categoria = ?`,
      [id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return new Categoria(rows[0]);
    } else {
      return null;
    }
  }

  /**
   * @param {Categoria} categoria
   * @return {Promise<number|null>}
   */
  async criarCategoria(categoria) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [result] = await pool.query(
        `INSERT INTO categorias (nome) VALUES (?)`,
        [categoria.nome]
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
   * @param {Categoria} categoria
   * @return {Promise<number|null>}
   */
  async atualizarCategoria(categoria) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [updated] = await pool.query(
        `UPDATE categorias SET nome = ? WHERE id_categoria = ?`,
        [categoria.nome, categoria.id_categoria]
      );
      if (updated.affectedRows === 0) {
        return null;
      }
      return categoria.id_categoria ?? null;
    } catch (error) {
      return null;
    }
  }

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  async removerCategoria(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await pool.query(
        `DELETE FROM categorias WHERE id_categoria = ?`,
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

module.exports = new CategoriaRepository();
