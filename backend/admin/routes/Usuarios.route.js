const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/UsuariosController");

router.get("/", usuariosController.listar);
router.get("/:id", usuariosController.detalhes);
router.post("/", usuariosController.criar);
router.put("/:id", usuariosController.atualizar);
router.delete("/:id", usuariosController.remover);

module.exports = router;
