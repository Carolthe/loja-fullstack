// @ts-check
const NewsletterListarInput = require("../input/Newsletters/NewsletterListarInput");
const Newsletter = require("../Interfaces/NewsletterInterface");
const newslettersRepository = require("../repository/NewsletterRepository");
const NotFoundError = require("../errors/NotFoundError");
const InternalServerError = require("../errors/InternalServerError");

class NewsletterService {
  /**
   * @param {NewsletterListarInput} query
   * @return {Promise<{data: Newsletter[], meta: any}>}
   */
  async listar({ limite, pagina, busca }) {
    const data = await newslettersRepository.listarNewsletters(
      pagina,
      limite,
      busca
    );
    const meta = await newslettersRepository.contarNewsletters(
      pagina,
      limite,
      busca
    );
    return { data, meta };
  }

  /**
   * @param {number} id
   * @return {Promise<Newsletter>}
   */
  async detalhes(id) {
    const newsletter = await newslettersRepository.obterNewsletterPorId(id);
    if (!newsletter) {
      throw new NotFoundError("Newsletter não encontrado");
    }
    return newsletter;
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  async remover(id) {
    const newsletter = await newslettersRepository.obterNewsletterPorId(id);
    if (!newsletter) {
      throw new NotFoundError("Newsletter não encontrado");
    }
    const removed = await newslettersRepository.removerNewsletter(id);
    if (!removed) {
      throw new InternalServerError("Erro ao remover newsletter");
    }
  }
}

module.exports = new NewsletterService();
