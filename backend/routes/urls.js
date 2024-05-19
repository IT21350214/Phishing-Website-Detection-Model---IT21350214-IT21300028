const express = require("express");
const router = express.Router();
const urlController = require("../controllers/UrlController");

router.get("/api/urls/", urlController.getAllUrls);
router.post("/api/urls/add", urlController.addUrl);

module.exports = router;
