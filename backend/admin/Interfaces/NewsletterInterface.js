class Newsletter {
  /**
   * @type {number|undefined}
   */
  id_newsletter;

  /**
   * @type {string}
   */
  nome;

  /**
   * @type {string|undefined}
   */
  email;

  /**
   * @type {Date|undefined}
   */
  data_inscricao;

  constructor(newsletter) {
    this.nome = newsletter.nome;
    this.email = newsletter.email;
    this.data_inscricao = newsletter.data_inscricao;
    this.id_newsletter = newsletter.id_newsletter;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Newsletter(row);
  }
}

module.exports = Newsletter;
