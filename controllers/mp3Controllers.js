const { fetchMP3Data } = require("../services/mp3Service");

async function handleMP3Download(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res
        .status(400)
        .json({ success: false, error: "Missing 'url' parameter." });
    }

    const data = await fetchMP3Data(url);
    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { handleMP3Download };
