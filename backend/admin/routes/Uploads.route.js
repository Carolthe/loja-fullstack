const express = require("express");
const router = express.Router();
const uploadsController = require("../controllers/UploadsController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

router.post("/", uploadMiddleware.single("file"), uploadsController.uploadImage);

module.exports = router;
