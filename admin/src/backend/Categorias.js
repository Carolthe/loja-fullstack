// @ts-check

/**
 * @typedef Categoria
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Categorias extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "categorias";
  }

  /**
   * @returns {Promise<Categoria[]>}
   */
  async getAllCategories() {
    /**
     * @type {Categoria[]|null}
     */
    const data = await this.makeRequest();
    if (!data) {
      return [];
    }
    return data;
  }

  /**
   * @param {{nome: string}} categoriaData
   * @returns {Promise<boolean>}
   */
  async create(categoriaData) {
    const response = await this.makeRequest({
      body: categoriaData,
      method: "POST",
    });
    return response !== null;
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
   * @param {{nome: string}} categoriaData
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async update(categoriaData, id) {
    const response = await this.makeRequest({
      body: categoriaData,
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
