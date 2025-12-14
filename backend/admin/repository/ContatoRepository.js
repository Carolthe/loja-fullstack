// @ts-check

const Contato = require("../Interfaces/ContatoInterface");
const pool = require("../../models/db");

class ContatoRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Contato[]>}
   */
  async listarContatos(pagina, limite) {
    const [rows] = await pool.query(
      `SELECT id_contato, nome, email FROM contatos LIMIT ? OFFSET ?`,
      [limite, (pagina - 1) * limite]
    );
    /**
     * @type {Contato[]}
     */
    let contatos = [];
    if (Array.isArray(rows)) {
      contatos = rows.map(Contato.fromDb);
    } else {
      contatos = [];
    }
    return contatos;
  }

  /**
   * @param {number} id
   * @return {Promise<Contato|null>}
   */
  async obterContatoPorId(id) {
    const [rows] = await pool.query(
      `SELECT id_contato, nome, email, mensagem FROM contatos WHERE id_contato = ?`,
      [id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return new Contato(rows[0]);
    } else {
      return null;
    }
  }

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  async removerContato(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await pool.query(
        `DELETE FROM contatos WHERE id_contato = ?`,
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

module.exports = new ContatoRepository();
