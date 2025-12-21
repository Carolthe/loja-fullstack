// @ts-check

/**
 * @typedef Categoria
 * @property {number} id
 */

/**
 * @typedef Meta
 * @property {number} current_page
 * @property {number} per_page
 * @property {number} total_items
 * @property {number} total_pages
 */

import { Admin } from "./Admin";

export class Categorias extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "categorias";
  }
}
