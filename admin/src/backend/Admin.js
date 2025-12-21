// @ts-check

export class Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    throw new Error("Method 'getSufix()' must be implemented.");
  }

  /**
   * @param {Object} [pathParam]
   * @param {Object} [queryParam]
   */
  getUrl(pathParam, queryParam) {
    if (pathParam) {
      const param = Object.values(pathParam);
      return `http://localhost:3000/admin/${this.getSufix()}/${param}`;
    }
    if (queryParam) {
      const queryString = Object.entries(queryParam)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      return `http://localhost:3000/admin/${this.getSufix()}?${queryString}`;
    }
    return `http://localhost:3000/admin/${this.getSufix()}`;
  }

  /**
   * @template T
   * @param {{body?: Object|null, method?: "GET"|"POST"|"PUT"|"DELETE", pathParams?: { [key: string]: string }, queryParams?: { [key: string]: string }}} [options]
   * @return {Promise<T|null>}
   */
  async makeRequest(options) {
    let body = options?.body || null;
    const method = options?.method || "GET";
    const pathParams = options?.pathParams || undefined;
    const queryParams = options?.queryParams || undefined;
    if (body) {
      body = JSON.stringify(body);
    }
    const url = this.getUrl(pathParams, queryParams);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      return null;
    }
    if (response.status === 204) {
      // @ts-ignore
      return true;
    }
    const data = await response.json();
    return data;
  }

  // Métodos comuns de CRUD podem ser adicionados aqui
  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const data = await this.makeRequest({
      queryParams: {
        pagina: String(page),
        limite: String(limit),
        busca: search,
      },
    });
    if (!data) {
      return [];
    }
    return data;
  }

  async create(body) {
    const response = await this.makeRequest({
      body,
      method: "POST",
    });
    return response !== null;
  }

  async getById(id) {
    const data = await this.makeRequest({
      pathParams: {
        id: String(id),
      },
    });
    return data;
  }

  async update(body, id) {
    const response = await this.makeRequest({
      body: body,
      method: "PUT",
      pathParams: {
        id: String(id),
      },
    });
    return response !== null;
  }

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
