const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    nome: req.user.nome,
    role: req.user.role,
  });
});

module.exports = router;
