// @ts-check
const newsletterService = require("../services/NewslettersService");
const NewsletterListarInput = require("../input/Newsletters/NewsletterListarInput.js");
const ControllerBase = require("./ControllerBase");
const NewsletterDetalheInput = require("../input/Newsletters/NewsletterDetalheInput");
const NewsletterDeletarInput = require("../input/Newsletters/NewsletterDeletarInput");

class NewslettersController extends ControllerBase {
  constructor() {
    super();
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async listar(req, res) {
    const query = req.query;
    try {
      const newslettersInput = NewsletterListarInput.fromQuery(query);
      const newsletters = await newsletterService.listar(newslettersInput);
      return res.status(200).json(newsletters);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async detalhes(req, res) {
    const params = req.params;
    try {
      const newsletterInput = NewsletterDetalheInput.fromParams(params);
      const newsletter = await newsletterService.detalhes(newsletterInput);
      return res.status(200).json(newsletter);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async remover(req, res) {
    const params = req.params;
    try {
      const id = NewsletterDeletarInput.fromParams(params);
      await newsletterService.remover(id);
      return res.status(204).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new NewslettersController();
