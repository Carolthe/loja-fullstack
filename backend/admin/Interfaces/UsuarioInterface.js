class Usuario {
  /**
   * @type {number|undefined}
   */
  id_usuario;

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
  senha;

  /**
   * @type {Date|undefined}
   */
  data_criacao;

  constructor(usuario) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.data_criacao = usuario.data_criacao;
    this.id_usuario = usuario.id_usuario;
  }

  /**
   * @param {Object} row
   */
  static fromDb(row) {
    return new Usuario(row);
  }
}

module.exports = Usuario;
