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
  async getAllProducts() {
    /**
     * @type {Produto[]|null}
     */
    const data = await this.makeRequest();
    if (!data) {
      return [];
    }
    return data;
  }
}
