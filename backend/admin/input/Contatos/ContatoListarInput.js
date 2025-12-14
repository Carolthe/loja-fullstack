// @ts-check
const ValidationError = require("../../errors/ValidationError");

class ContatoListarInput {
  /**
   * @param {number} pagina
   */
  pagina;

  /**
   * @param {number} limite
   */
  limite;

  /**
   * @param {{ pagina: number, limite: number }} query
   */
  constructor({ pagina, limite }) {
    this.pagina = pagina;
    this.limite = limite;
  }

  /**
   *
   * @param {{ pagina?: number, limite?: number }} query
   */
  static fromQuery({ limite, pagina }) {
    const limiteNumber = limite ? Number(limite) : 10;
    const paginaNumber = pagina ? Number(pagina) : 1;

    if (isNaN(limiteNumber) || limiteNumber <= 0) {
      throw new ValidationError("Limite inválido");
    }

    if (isNaN(paginaNumber) || paginaNumber <= 0) {
      throw new ValidationError("Página inválida");
    }

    return new ContatoListarInput({
      limite: limiteNumber,
      pagina: paginaNumber,
    });
  }
}

module.exports = ContatoListarInput;
