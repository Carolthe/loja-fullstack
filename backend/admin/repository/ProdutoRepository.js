// @ts-check

const Produto = require("../Interfaces/ProdutoInterface");
const pool = require("../../models/db");
const LogError = require("../utils/LogError");
const InternalServerError = require("../errors/InternalServerError");

class ProdutoRepository {
  /**
   * @param {number} pagina
   * @param {number} limite
   * @return {Promise<Produto[]>}
   */
  async listarProdutos(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT id_produto, nome, preco, estoque FROM produtos WHERE nome LIKE ? LIMIT ? OFFSET ?`,
        [`${busca}%`, limite, (pagina - 1) * limite]
      );
      /**
       * @type {Produto[]}
       */
      let produtos = [];
      if (Array.isArray(rows)) {
        produtos = rows.map(Produto.fromDb);
      } else {
        produtos = [];
      }
      return produtos;
    } catch (error) {
      LogError.log(error, __filename);
      throw new InternalServerError("Erro ao listar produtos");
    }
  }

  /**
   * @param {number} id
   * @return {Promise<Produto|null>}
   */
  async obterProdutoPorId(id) {
    try {
      const [rows] = await pool.query(
        `SELECT id_produto, nome, descricao, preco, imagem, estoque, data_criacao FROM produtos WHERE id_produto = ?`,
        [id]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return new Produto(rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      LogError.log(error, __filename);
      return null;
    }
  }

  /**
   * @param {Produto} produto
   * @return {Promise<number|null>}
   */
  async criarProduto(produto) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [result] = await pool.query(
        `INSERT INTO produtos (nome, descricao, preco, imagem, estoque)
     VALUES (?, ?, ?, ?, ?)`,
        [
          produto.nome,
          produto.descricao,
          produto.preco,
          produto.imagem,
          produto.estoque,
        ]
      );
      if (result.insertId) {
        return result.insertId;
      }
      throw null;
    } catch (error) {
      LogError.log(error, __filename);
      throw null;
    }
  }

  /**
   * @param {Produto} produto
   * @return {Promise<number|null>}
   */
  async atualizarProduto(produto) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [updated] = await pool.query(
        `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ?, estoque = ? WHERE id_produto = ?`,
        [
          produto.nome,
          produto.descricao,
          produto.preco,
          produto.imagem,
          produto.estoque,
          produto.id_produto,
        ]
      );
      if (updated.affectedRows === 0) {
        return null;
      }
      return produto.id_produto ?? null;
    } catch (error) {
      LogError.log(error, __filename);
      return null;
    }
  }

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  async removerProduto(id) {
    try {
      /**
       * @type {[import("mysql2/promise").ResultSetHeader, import("mysql2/promise").FieldPacket[]]}
       */
      const [removed] = await pool.query(
        `DELETE FROM produtos WHERE id_produto = ?`,
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

  async contarProdutos(pagina, limite, busca) {
    try {
      const [rows] = await pool.query(
        `SELECT COUNT(*) as total FROM produtos WHERE nome LIKE ?`,
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
      throw new InternalServerError("Erro ao contar produtos");
    }
  }
}

module.exports = new ProdutoRepository();
