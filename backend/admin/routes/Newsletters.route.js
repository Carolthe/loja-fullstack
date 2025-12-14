const express = require("express");
const router = express.Router();
const newslettersController = require("../controllers/NewslettersController");

router.get("/", newslettersController.listar);
router.get("/:id", newslettersController.detalhes);
router.delete("/:id", newslettersController.remover);

module.exports = router;
