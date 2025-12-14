class Produto {
  /**
   * @type {number|undefined}
   */
  id_produto;

  /**
   * @type {string}
   */
  nome;

  /**
   * @type {string|undefined}
   */
  descricao;

  /**
   * @type {number}
   */
  preco;

  /**
   * @type {string|undefined}
   */
  imagem;

  /**
   * @type {number}
   */
  estoque;

  /**
   * @type {Date|undefined}
   */
  data_criacao;

  constructor(produto) {
    this.nome = produto.nome;
    this.preco = produto.preco;
    this.imagem = produto.imagem;
    this.estoque = produto.estoque;
    this.descricao = produto.descricao;
    this.id_produto = produto.id_produto;
    this.data_criacao = produto.data_criacao;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Produto(row);
  }
}

module.exports = Produto;
