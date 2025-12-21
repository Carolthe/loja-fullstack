// @ts-check

const Newsletter = require("../Interfaces/NewsletterInterface");
const pool = require("../../models/db");
const LogError = require("../utils/LogError");
const InternalServerError = require("../errors/InternalServerError");

class NewsletterRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Newsletter[]>}
   */
  async listarNewsletters(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT id_newsletter, nome, email FROM newsletters WHERE nome LIKE ? LIMIT ? OFFSET ?`,
        [`${busca}%`, limite, (pagina - 1) * limite]
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
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao listar newsletters");
    }
  }

  /**
   * @param {number} id
   * @return {Promise<Newsletter|null>}
   */
  async obterNewsletterPorId(id) {
    try {
      const [rows] = await pool.query(
        `SELECT id_newsletter, nome, email, data_inscricao FROM newsletters WHERE id_newsletter = ?`,
        [id]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return new Newsletter(rows[0]);
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
      LogError.log(error, __filename);
      return false;
    }
  }

  async contarNewsletters(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT COUNT(*) as total FROM newsletters WHERE nome LIKE ?`,
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
      throw new InternalServerError("Erro ao contar newsletters");
    }
  }
}

module.exports = new NewsletterRepository();
