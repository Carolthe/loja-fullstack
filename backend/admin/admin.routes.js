// @ts-check

const express = require("express");
const router = express.Router();
const produtosRoutes = require("./routes/Produtos.route");
const categoriasRoutes = require("./routes/Categorias.route");
const usuariosRoutes = require("./routes/Usuarios.route");

router.use("/produtos", produtosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;
