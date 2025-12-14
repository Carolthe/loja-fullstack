// @ts-check

const express = require("express");
const router = express.Router();
const produtosRoutes = require("./routes/Produtos.route");

router.use("/produtos", produtosRoutes);

module.exports = router;
