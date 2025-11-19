const express = require("express");
const router = express.Router();
const { handleYouTubeDownload } = require("../controllers/mp3Controller");

router.get("/download", handleYouTubeDownload);

module.exports = router;
