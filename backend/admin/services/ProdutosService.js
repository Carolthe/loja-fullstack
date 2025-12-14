// @ts-check
const ProdutoListarInput = require("../input/Produtos/ProdutoListarInput");
const Produto = require("../Interfaces/ProdutoInterface");
const produtosRepository = require("../repository/ProdutoRepository");
const NotFoundError = require("../errors/NotFoundError");
const ProdutoAtualizarInput = require("../input/Produtos/ProdutoAtualizarInput");
const ProdutoCriarInput = require("../input/Produtos/ProdutoCriarInput");
const InternalServerError = require("../errors/InternalServerError");

class ProdutoService {
  /**
   * @param {ProdutoListarInput} query
   * @return {Promise<Produto[]>}
   */
  async listar({ limite, pagina }) {
    return await produtosRepository.listarProdutos(pagina, limite);
  }

  /**
   * @param {number} id
   * @return {Promise<Produto>}
   */
  async detalhes(id) {
    const produto = await produtosRepository.obterProdutoPorId(id);
    if (!produto) {
      throw new NotFoundError("Produto não encontrado");
    }
    return produto;
  }

  /**
   * @param {ProdutoCriarInput} produto
   */
  async criar(produto) {
    const novoProduto = new Produto({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagem: produto.imagem,
      estoque: produto.estoque,
    });
    const id = await produtosRepository.criarProduto(novoProduto);
    if (!id) {
      throw new InternalServerError("Erro ao criar produto");
    }
    return await produtosRepository.obterProdutoPorId(id);
  }

  /**
   * @param {number} id
   * @param {ProdutoAtualizarInput} produto
   */
  async atualizar(
    id,
    { data_criacao, nome, descricao, preco, imagem, estoque }
  ) {
    const produtoAtualizado = new Produto({
      id_produto: id,
      nome,
      descricao,
      preco,
      imagem,
      estoque,
      data_criacao,
    });
    const idProduto = await produtosRepository.atualizarProduto(
      produtoAtualizado
    );
    if (!idProduto) {
      throw new InternalServerError("Erro ao atualizar produto");
    }
    return await produtosRepository.obterProdutoPorId(idProduto);
  }

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  async remover(id) {
    const produto = await produtosRepository.obterProdutoPorId(id);
    if (!produto) {
      throw new NotFoundError("Produto não encontrado");
    }
    const removed = await produtosRepository.removerProduto(id);
    if (!removed) {
      throw new InternalServerError("Erro ao remover produto");
    }
  }
}

module.exports = new ProdutoService();
