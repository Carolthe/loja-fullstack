// @ts-check
const ValidationError = require("../../errors/ValidationError");

class ProdutoCriarInput {
  /**
   * @param {string} nome
   */
  nome;

  /**
   * @param {string} descricao
   */
  descricao;

  /**
   * @param {number} preco
   */
  preco;

  /**
   * @param {string} imagem
   */
  imagem;

  /**
   * @param {number} estoque
   */
  estoque;

  /**
   * @param {Date} data_criacao
   *
   */
  data_criacao;

  constructor({ nome, descricao, preco, imagem, estoque }) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagem = imagem;
    this.estoque = estoque;
    this.data_criacao = new Date();
  }

  /**
   * @param {Object} body
   * @return {ProdutoCriarInput}
   */
  static fromBody(body) {
    if (!body) {
      throw new ValidationError("Dados do produto são obrigatórios");
    }
    if (body.estoque === undefined) {
      body.estoque = 1;
    }
    if (typeof body.nome !== "string" || body.nome.trim() === "") {
      throw new ValidationError("Nome é obrigatório");
    }
    if (typeof body.descricao !== "string" || body.descricao.trim() === "") {
      throw new ValidationError("Descrição é obrigatória");
    }
    if (body.preco === undefined) {
      throw new ValidationError("Preço é obrigatório");
    }
    if (typeof body.imagem !== "string" || body.imagem.trim() === "") {
      throw new ValidationError("Imagem é obrigatória");
    }
    if (typeof body.preco !== "number") {
      throw new ValidationError("Preço deve ser um número");
    }
    if (typeof body.estoque !== "number") {
      throw new ValidationError("Estoque deve ser um número");
    }
    if (body.estoque < 0) {
      throw new ValidationError("Estoque não pode ser negativo");
    }
    if (body.preco < 0) {
      throw new ValidationError("Preço não pode ser negativo");
    }
    return new ProdutoCriarInput(body);
  }
}

module.exports = ProdutoCriarInput;
