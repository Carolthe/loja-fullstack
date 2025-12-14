const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/CategoriasController");

router.get("/", categoriasController.listar);
router.get("/:id", categoriasController.detalhes);
router.post("/", categoriasController.criar);
router.put("/:id", categoriasController.atualizar);
router.delete("/:id", categoriasController.remover);

module.exports = router;
