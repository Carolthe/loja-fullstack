// @ts-check

/**
 * @typedef Produto
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Produtos extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "produtos";
  }

  /**
   * @returns {Promise<Produto[]>}
   */
  async getAllProducts(page = 1) {
    /**
     * @type {Produto[]|null}
     */
    const data = await this.makeRequest({
      queryParams: {
        pagina: String(page),
      },
    });
    if (!data) {
      return [];
    }
    return data;
  }

  /**
   * @param {{nome: string, descricao: string, preco: number, imagem: string, estoque: number}} produtoData
   * @returns {Promise<Produto|null>}
   */
  async create(produtoData) {
    const response = await this.makeRequest({
      body: produtoData,
      method: "POST",
    });
    if (!response) {
      return null;
    }
    return response;
  }

  /**
   * @template T
   * @param {number|string} id
   * @returns {Promise<T|null>}
   */
  async getById(id) {
    /**
     * @type {T|null}
     */
    const data = await this.makeRequest({
      pathParams: {
        id: String(id),
      },
    });
    return data;
  }

  /**
   * @param {{nome: string, descricao: string, preco: number, imagem: string, estoque: number}} produtoData
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async update(produtoData, id) {
    const response = await this.makeRequest({
      body: produtoData,
      method: "PUT",
      pathParams: {
        id: String(id),
      },
    });
    return response !== null;
  }

  /**
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const response = await this.makeRequest({
      method: "DELETE",
      pathParams: {
        id: String(id),
      },
    });
    return response !== null;
  }
}
