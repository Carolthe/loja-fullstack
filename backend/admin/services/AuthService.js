// @ts-check

const InternalServerError = require("../errors/InternalServerError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const Usuario = require("../Interfaces/UsuarioInterface");
const AuthRepository = require("../repository/AuthRepository");

class AuthService {
  async login(input) {
    const email = input.email;
    const password = input.password;

    const user = await AuthRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Usuário ou senha inválidos");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Usuário ou senha inválidos");
    }

    const token = user.generateJWT();
    return token;
  }

  async register(input) {
    const email = input.email;
    const senha = input.senha;
    const nome = input.nome;

    const user = await AuthRepository.getUserByEmail(email);
    if (user) {
      throw new UnauthorizedError("Usuário já existe");
    }

    const newUser = new Usuario({
      nome,
      email,
      senha,
    });

    await newUser.hashPassword();

    const createdUser = await AuthRepository.createUser(newUser);
    if (!createdUser) {
      throw new InternalServerError("Erro ao criar usuário");
    }

    const createdUserObject = await AuthRepository.getUserByEmail(email);
    if (!createdUserObject) {
      throw new InternalServerError("Erro ao recuperar usuário criado");
    }
    createdUserObject.senha = undefined;
    return createdUserObject;
  }
}

module.exports = new AuthService();
