class Categoria {
  /**
   * @type {number|undefined}
   */
  id_categoria;

  /**
   * @type {string}
   */
  nome;

  constructor(categoria) {
    this.nome = categoria.nome;
    this.id_categoria = categoria.id_categoria;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Categoria(row);
  }
}

module.exports = Categoria;
