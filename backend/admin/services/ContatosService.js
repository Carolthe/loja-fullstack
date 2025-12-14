// @ts-check
const ContatoListarInput = require("../input/Contatos/ContatoListarInput");
const Contato = require("../Interfaces/ContatoInterface");
const contatosRepository = require("../repository/ContatoRepository");
const NotFoundError = require("../errors/NotFoundError");
const InternalServerError = require("../errors/InternalServerError");

class ContatoService {
  /**
   * @param {ContatoListarInput} query
   * @return {Promise<Contato[]>}
   */
  async listar({ limite, pagina }) {
    return await contatosRepository.listarContatos(pagina, limite);
  }

  /**
   * @param {number} id
   * @return {Promise<Contato>}
   */
  async detalhes(id) {
    const contato = await contatosRepository.obterContatoPorId(id);
    if (!contato) {
      throw new NotFoundError("Contato não encontrado");
    }
    return contato;
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  async remover(id) {
    const contato = await contatosRepository.obterContatoPorId(id);
    if (!contato) {
      throw new NotFoundError("Contato não encontrado");
    }
    const removed = await contatosRepository.removerContato(id);
    if (!removed) {
      throw new InternalServerError("Erro ao remover contato");
    }
  }
}

module.exports = new ContatoService();
