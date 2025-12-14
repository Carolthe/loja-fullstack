// @ts-check

const express = require("express");
const router = express.Router();
const produtosRoutes = require("./routes/Produtos.route");
const categoriasRoutes = require("./routes/Categorias.route");

router.use("/produtos", produtosRoutes);
router.use("/categorias", categoriasRoutes);

module.exports = router;
