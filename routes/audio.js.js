const express = require("express");
const router = express.Router();
const { extractAudio } = require("../controllers/audioController");

router.get("/download", extractAudio);

module.exports = router;
