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
}
