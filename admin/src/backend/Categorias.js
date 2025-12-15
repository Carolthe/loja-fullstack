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
}
