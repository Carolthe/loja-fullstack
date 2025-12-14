const express = require("express");
const router = express.Router();
const contatosController = require("../controllers/ContatosController");

router.get("/", contatosController.listar);
router.get("/:id", contatosController.detalhes);
router.delete("/:id", contatosController.remover);

module.exports = router;
