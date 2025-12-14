// @ts-check
const contatoService = require("../services/ContatosService");
const ContatoListarInput = require("../input/Contatos/ContatoListarInput");
const ControllerBase = require("./ControllerBase");
const ContatoDetalheInput = require("../input/Contatos/ContatoDetalheInput");
const ContatoDeletarInput = require("../input/Contatos/ContatoDeletarInput");

class ContatosController extends ControllerBase {
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
      const contatosInput = ContatoListarInput.fromQuery(query);
      const contatos = await contatoService.listar(contatosInput);
      return res.status(200).json(contatos);
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
      const contatoInput = ContatoDetalheInput.fromParams(params);
      const contato = await contatoService.detalhes(contatoInput);
      return res.status(200).json(contato);
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
      const id = ContatoDeletarInput.fromParams(params);
      await contatoService.remover(id);
      return res.status(204).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new ContatosController();
