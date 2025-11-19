const express = require("express");
const router = express.Router();
const { handleMP3Download } = require("../controllers/mp3Controller");

router.get("/download", handleMP3Download);

module.exports = router;
