const { getAudioFormats } = require("../services/audioService");

async function extractAudio(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res
        .status(400)
        .json({ success: false, error: "Missing 'url' query parameter." });
    }

    const data = await getAudioFormats(url);
    res.json({ success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: err.message || "Audio extraction failed" });
  }
}

module.exports = { extractAudio };
