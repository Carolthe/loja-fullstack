class Contato {
  /**
   * @type {number|undefined}
   */
  id_contato;

  /**
   * @type {string}
   */
  nome;

  /**
   * @type {string|undefined}
   */
  email;

  /**
   * @type {string|undefined}
   */
  mensagem;

  constructor(contato) {
    this.nome = contato.nome;
    this.email = contato.email;
    this.mensagem = contato.mensagem;
    this.id_contato = contato.id_contato;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Contato(row);
  }
}

module.exports = Contato;
