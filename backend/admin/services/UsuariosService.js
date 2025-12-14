// @ts-check
const UsuarioListarInput = require("../input/Usuarios/UsuarioListarInput");
const Usuario = require("../Interfaces/UsuarioInterface");
const usuariosRepository = require("../repository/UsuarioRepository");
const NotFoundError = require("../errors/NotFoundError");
const UsuarioAtualizarInput = require("../input/Usuarios/UsuarioAtualizarInput");
const UsuarioCriarInput = require("../input/Usuarios/UsuarioCriarInput");
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
   * @param {UsuarioCriarInput} usuario
   */
  async criar(usuario) {
    const novoUsuario = new Usuario({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      data_criacao: usuario.data_criacao,
    });
    const id = await usuariosRepository.criarUsuario(novoUsuario);
    if (!id) {
      throw new InternalServerError("Erro ao criar usuario");
    }
    return await usuariosRepository.obterUsuarioPorId(id);
  }

  /**
   * @param {number} id
   * @param {UsuarioAtualizarInput} usuario
   */
  async atualizar(id, { email, nome, senha }) {
    const usuarioAtualizado = new Usuario({
      id_usuario: id,
      nome,
      email,
      senha,
    });
    const usuario = await usuariosRepository.obterUsuarioPorId(id);
    if (!usuario) {
      throw new NotFoundError("Usuario não encontrado");
    }
    const idUsuario = await usuariosRepository.atualizarUsuario(
      usuarioAtualizado
    );
    if (!idUsuario) {
      throw new InternalServerError("Erro ao atualizar usuario");
    }
    return await usuariosRepository.obterUsuarioPorId(idUsuario);
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
