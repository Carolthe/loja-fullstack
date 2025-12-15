// @ts-check

/**
 * @typedef Usuario
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Usuarios extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "usuarios";
  }

  /**
   * @returns {Promise<Usuario[]>}
   */
  async getAllUsers() {
    /**
     * @type {Usuario[]|null}
     */
    const data = await this.makeRequest();
    if (!data) {
      return [];
    }
    return data;
  }
}
