// @ts-check

const Newsletter = require("../Interfaces/NewsletterInterface");
const pool = require("../../models/db");

class NewsletterRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Newsletter[]>}
   */
  async listarNewsletters(pagina, limite) {
    const [rows] = await pool.query(
      `SELECT id_newsletter, nome, email FROM newsletters LIMIT ? OFFSET ?`,
      [limite, (pagina - 1) * limite]
    );
    /**
     * @type {Newsletter[]}
     */
    let newsletters = [];
    if (Array.isArray(rows)) {
      newsletters = rows.map(Newsletter.fromDb);
    } else {
      newsletters = [];
    }
    return newsletters;
  }

  /**
   * @param {number} id
   * @return {Promise<Newsletter|null>}
   */
  async obterNewsletterPorId(id) {
    const [rows] = await pool.query(
      `SELECT id_newsletter, nome, email, data_inscricao FROM newsletters WHERE id_newsletter = ?`,
      [id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return new Newsletter(rows[0]);
    } else {
      return null;
    }
  }

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  async removerNewsletter(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await pool.query(
        `DELETE FROM newsletters WHERE id_newsletter = ?`,
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

module.exports = new NewsletterRepository();
