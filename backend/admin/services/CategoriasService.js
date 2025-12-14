// @ts-check
const CategoriaListarInput = require("../input/Categorias/CategoriaListarInput");
const Categoria = require("../Interfaces/CategoriaInterface");
const categoriasRepository = require("../repository/CategoriaRepository");
const NotFoundError = require("../errors/NotFoundError");
const CategoriaAtualizarInput = require("../input/Categorias/CategoriaAtualizarInput");
const CategoriaCriarInput = require("../input/Categorias/CategoriaCriarInput");
const InternalServerError = require("../errors/InternalServerError");

class CategoriaService {
  /**
   * @param {CategoriaListarInput} query
   * @return {Promise<Categoria[]>}
   */
  async listar({ limite, pagina }) {
    return await categoriasRepository.listarCategorias(pagina, limite);
  }

  /**
   * @param {number} id
   * @return {Promise<Categoria>}
   */
  async detalhes(id) {
    const categoria = await categoriasRepository.obterCategoriaPorId(id);
    if (!categoria) {
      throw new NotFoundError("Categoria não encontrado");
    }
    return categoria;
  }

  /**
   * @param {CategoriaCriarInput} categoria
   */
  async criar(categoria) {
    const novoCategoria = new Categoria({
      nome: categoria.nome,
    });
    const id = await categoriasRepository.criarCategoria(novoCategoria);
    if (!id) {
      throw new InternalServerError("Erro ao criar categoria");
    }
    return await categoriasRepository.obterCategoriaPorId(id);
  }

  /**
   * @param {number} id
   * @param {CategoriaAtualizarInput} categoria
   */
  async atualizar(id, { nome }) {
    const categoriaAtualizado = new Categoria({
      id_categoria: id,
      nome,
    });
    const categoria = await categoriasRepository.obterCategoriaPorId(id);
    if (!categoria) {
      throw new NotFoundError("Categoria não encontrado");
    }
    const idCategoria = await categoriasRepository.atualizarCategoria(
      categoriaAtualizado
    );
    if (!idCategoria) {
      throw new InternalServerError("Erro ao atualizar categoria");
    }
    return await categoriasRepository.obterCategoriaPorId(idCategoria);
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  async remover(id) {
    const categoria = await categoriasRepository.obterCategoriaPorId(id);
    if (!categoria) {
      throw new NotFoundError("Categoria não encontrado");
    }
    const removed = await categoriasRepository.removerCategoria(id);
    if (!removed) {
      throw new InternalServerError("Erro ao remover categoria");
    }
  }
}

module.exports = new CategoriaService();
