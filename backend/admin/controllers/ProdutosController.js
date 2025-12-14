// @ts-check
const produtoService = require("../services/ProdutosService");
const ProdutoListarInput = require("../input/Produtos/ProdutoListarInput");
const ControllerBase = require("./ControllerBase");
const ProdutoDetalheInput = require("../input/Produtos/ProdutoDetalheInput");
const ProdutoCriarInput = require("../input/Produtos/ProdutoCriarInput");
const ProdutoAtualizarInput = require("../input/Produtos/ProdutoAtualizarInput");
const ProdutoDeletarInput = require("../input/Produtos/ProdutoDeletarInput");

class ProdutosController extends ControllerBase {
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
      const produtosInput = ProdutoListarInput.fromQuery(query);
      const produtos = await produtoService.listar(produtosInput);
      return res.status(200).json(produtos);
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
      const produtoInput = ProdutoDetalheInput.fromParams(params);
      const produto = await produtoService.detalhes(produtoInput);
      return res.status(200).json(produto);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async criar(req, res) {
    const body = req.body;
    try {
      const produtoCriado = ProdutoCriarInput.fromBody(body);
      const produto = await produtoService.criar(produtoCriado);
      res.status(201).json(produto);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async atualizar(req, res) {
    const body = req.body;
    const params = req.params;
    try {
      const produtoAtualizar = ProdutoAtualizarInput.fromBody(body);
      const produtoId = ProdutoAtualizarInput.fromParams(params);
      const produto = await produtoService.atualizar(
        produtoId,
        produtoAtualizar
      );
      return res.status(200).json(produto);
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
      const id = ProdutoDeletarInput.fromParams(params);
      await produtoService.remover(id);
      return res.status(204).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new ProdutosController();
