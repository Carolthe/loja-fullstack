// @ts-check
const categoriaService = require("../services/CategoriasService");
const CategoriaListarInput = require("../input/Categorias/CategoriaListarInput");
const ControllerBase = require("./ControllerBase");
const CategoriaDetalheInput = require("../input/Categorias/CategoriaDetalheInput");
const CategoriaCriarInput = require("../input/Categorias/CategoriaCriarInput");
const CategoriaAtualizarInput = require("../input/Categorias/CategoriaAtualizarInput");
const CategoriaDeletarInput = require("../input/Categorias/CategoriaDeletarInput");

class CategoriasController extends ControllerBase {
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
      const categoriasInput = CategoriaListarInput.fromQuery(query);
      const categorias = await categoriaService.listar(categoriasInput);
      return res.status(200).json(categorias);
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
      const categoriaInput = CategoriaDetalheInput.fromParams(params);
      const categoria = await categoriaService.detalhes(categoriaInput);
      return res.status(200).json(categoria);
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
      const categoriaCriado = CategoriaCriarInput.fromBody(body);
      const categoria = await categoriaService.criar(categoriaCriado);
      res.status(201).json(categoria);
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
      const categoriaAtualizar = CategoriaAtualizarInput.fromBody(body);
      const categoriaId = CategoriaAtualizarInput.fromParams(params);
      const categoria = await categoriaService.atualizar(
        categoriaId,
        categoriaAtualizar
      );
      return res.status(200).json(categoria);
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
      const id = CategoriaDeletarInput.fromParams(params);
      await categoriaService.remover(id);
      return res.status(204).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new CategoriasController();
