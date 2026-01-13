// @ts-check

const Contato = require("../Interfaces/ContatoInterface");
const ligacao = require("../../models/db");
const InternalServerError = require("../errors/InternalServerError");
const LogError = require("../utils/LogError");

class ContatoRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Contato[]>}
   */
  async listarContatos(pagina, limite) {
    try {
      const [rows] = await ligacao.query(
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
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao listar contatos");
    }
  }

  /**
   * @param {number} id
   * @return {Promise<Contato|null>}
   */
  async obterContatoPorId(id) {
    try {
      const [rows] = await ligacao.query(
        `SELECT id_contato, nome, email, mensagem FROM contatos WHERE id_contato = ?`,
        [id]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return new Contato(rows[0]);
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
  async removerContato(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await ligacao.query(
        `DELETE FROM contatos WHERE id_contato = ?`,
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

module.exports = new ContatoRepository();
