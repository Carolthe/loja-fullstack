// @ts-check

const express = require("express");
const router = express.Router();
const produtosRoutes = require("./routes/Produtos.route");
const categoriasRoutes = require("./routes/Categorias.route");
const usuariosRoutes = require("./routes/Usuarios.route");
const newslettersRoutes = require("./routes/Newsletters.route");
const contatosRoutes = require("./routes/Contatos.route");
const uploadsRoutes = require("./routes/Uploads.route");

router.use("/produtos", produtosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/newsletters", newslettersRoutes);
router.use("/contatos", contatosRoutes);
router.use("/uploads", uploadsRoutes);

module.exports = router;
