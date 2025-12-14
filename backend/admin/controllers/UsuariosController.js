// @ts-check
const usuarioService = require("../services/UsuariosService");
const UsuarioListarInput = require("../input/Usuarios/UsuarioListarInput");
const ControllerBase = require("./ControllerBase.js");
const UsuarioDetalheInput = require("../input/Usuarios/UsuarioDetalheInput");
const UsuarioCriarInput = require("../input/Usuarios/UsuarioCriarInput");
const UsuarioAtualizarInput = require("../input/Usuarios/UsuarioAtualizarInput");
const UsuarioDeletarInput = require("../input/Usuarios/UsuarioDeletarInput");

class UsuariosController extends ControllerBase {
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
      const usuariosInput = UsuarioListarInput.fromQuery(query);
      const usuarios = await usuarioService.listar(usuariosInput);
      return res.status(200).json(usuarios);
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
      const usuarioInput = UsuarioDetalheInput.fromParams(params);
      const usuario = await usuarioService.detalhes(usuarioInput);
      return res.status(200).json(usuario);
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
      const usuarioCriado = UsuarioCriarInput.fromBody(body);
      const usuario = await usuarioService.criar(usuarioCriado);
      res.status(201).json(usuario);
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
      const usuarioAtualizar = UsuarioAtualizarInput.fromBody(body);
      const usuarioId = UsuarioAtualizarInput.fromParams(params);
      const usuario = await usuarioService.atualizar(
        usuarioId,
        usuarioAtualizar
      );
      return res.status(200).json(usuario);
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
      const id = UsuarioDeletarInput.fromParams(params);
      await usuarioService.remover(id);
      return res.status(204).send();
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new UsuariosController();
