// @ts-check

/**
 * @typedef Newsletter
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Newsletters extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "newsletters";
  }

  /**
   * @returns {Promise<Newsletter[]>}
   */
  async getAllNewsletters() {
    /**
     * @type {Newsletter[]|null}
     */
    const data = await this.makeRequest();
    if (!data) {
      return [];
    }
    return data;
  }
}
