// @ts-check

const LoginInput = require("../input/Auth/LoginInput");
const ControllerBase = require("./ControllerBase");
const AuthService = require("../services/AuthService");
const RegisterInput = require("../input/Auth/RegisterInput");

class AuthController extends ControllerBase {
  constructor() {
    super();
  }

  async login(req, res) {
    try {
      const input = LoginInput.fromBody(req.body);
      const token = await AuthService.login(input);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ success: true });
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async register(req, res) {
    try {
      const input = RegisterInput.fromBody(req.body);
      const user = await AuthService.register(input);
      res.json(user);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async checkAuth(req, res) {
    try {
      res.json({ authenticated: true, user: req.user });
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async logout(req, res) {
    try {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ success: true });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new AuthController();
