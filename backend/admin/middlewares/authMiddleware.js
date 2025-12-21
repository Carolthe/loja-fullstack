// @ts-check
const jwt = require("jsonwebtoken");
const LogError = require("../utils/LogError");

function authMiddleware(req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.sendStatus(401);
  }

  const token = req.cookies.token;

  try {
    console.log(token);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      LogError.log(
        new Error("JWT_SECRET não está definido"),
        "JWT_SECRET não está definido nas variáveis de ambiente"
      );
      return res.sendStatus(401);
    }
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.sendStatus(401);
  }
}

module.exports = authMiddleware;
