// @ts-check
const ValidationError = require("../../errors/ValidationError");

class CategoriaListarInput {
  /**
   * @param {number} pagina
   */
  pagina;

  /**
   * @param {number} limite
   */
  limite;

  /**
   * @param {string} busca
   */
  busca;

  /**
   * @param {{ pagina: number, limite: number, busca: string }} query
   */
  constructor({ pagina, limite, busca }) {
    this.pagina = pagina;
    this.limite = limite;
    this.busca = busca;
  }

  /**
   *
   * @param {{ pagina?: number, limite?: number, busca?: string }} query
   */
  static fromQuery({ limite, pagina, busca }) {
    const limiteNumber = limite ? Number(limite) : 10;
    const paginaNumber = pagina ? Number(pagina) : 1;
    const buscaString = busca ? String(busca) : "";

    if (isNaN(limiteNumber) || limiteNumber <= 0) {
      throw new ValidationError("Limite inválido");
    }

    if (isNaN(paginaNumber) || paginaNumber <= 0) {
      throw new ValidationError("Página inválida");
    }

    return new CategoriaListarInput({
      limite: limiteNumber,
      pagina: paginaNumber,
      busca: buscaString,
    });
  }
}

module.exports = CategoriaListarInput;
