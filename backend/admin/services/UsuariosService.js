// @ts-check
const UsuarioListarInput = require("../input/Usuarios/UsuarioListarInput");
const Usuario = require("../Interfaces/UsuarioInterface");
const usuariosRepository = require("../repository/UsuarioRepository");
const NotFoundError = require("../errors/NotFoundError");
const InternalServerError = require("../errors/InternalServerError");

class UsuarioService {
  /**
   * @param {UsuarioListarInput} query
   * @return {Promise<Usuario[]>}
   */
  async listar({ limite, pagina }) {
    return await usuariosRepository.listarUsuarios(pagina, limite);
  }

  /**
   * @param {number} id
   * @return {Promise<Usuario>}
   */
  async detalhes(id) {
    const usuario = await usuariosRepository.obterUsuarioPorId(id);
    if (!usuario) {
      throw new NotFoundError("Usuario não encontrado");
    }
    return usuario;
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  async remover(id) {
    const usuario = await usuariosRepository.obterUsuarioPorId(id);
    if (!usuario) {
      throw new NotFoundError("Usuario não encontrado");
    }
    const removed = await usuariosRepository.removerUsuario(id);
    if (!removed) {
      throw new InternalServerError("Erro ao remover usuario");
    }
  }
}

module.exports = new UsuarioService();
