// @ts-check

const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const router = express.Router();
const produtosRoutes = require("./routes/Produtos.route");
const categoriasRoutes = require("./routes/Categorias.route");
const usuariosRoutes = require("./routes/Usuarios.route");
const newslettersRoutes = require("./routes/Newsletters.route");
const contatosRoutes = require("./routes/Contatos.route");
const uploadsRoutes = require("./routes/Uploads.route");
const authRoutes = require("./routes/Auth.route");

router.use("/auth", authRoutes);
router.use("/produtos", authMiddleware, produtosRoutes);
router.use("/categorias", authMiddleware, categoriasRoutes);
router.use("/usuarios", authMiddleware, usuariosRoutes);
router.use("/newsletters", authMiddleware, newslettersRoutes);
router.use("/contatos", authMiddleware, contatosRoutes);
router.use("/uploads", authMiddleware, uploadsRoutes);

module.exports = router;
