// @ts-check
export class Auth {
  async makeRequest({ body = null, uri = "", method = "GET" } = {}) {
    return await fetch(uri, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });
  }

  async login(senha, email) {
    const uri = "http://localhost:3000/admin/auth/login";
    const body = {
      email: email,
      password: senha,
    };
    return this.makeRequest({ uri, body, method: "POST" });
  }

  async logout() {
    const uri = "http://localhost:3000/admin/auth/logout";
    return this.makeRequest({ uri, method: "POST" });
  }

  async checkAuth() {
    const uri = "http://localhost:3000/admin/auth/me";
    return this.makeRequest({ uri });
  }

  validateLogin(email, senha) {
    if (!email || !senha) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }
}
