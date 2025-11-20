const axios = require("axios");

async function getAudioFormats(url) {
  try {
    const res = await axios.get(
      "https://api.vidfly.ai/api/media/youtube/download",
      {
        params: { url },
        headers: {
          accept: "*/*",
          "content-type": "application/json",
          "x-app-name": "vidfly-web",
          "x-app-version": "1.0.0",
          Referer: "https://vidfly.ai/"
        }
      }
    );

    const raw = res.data?.data;
    if (!raw || !raw.items) {
      throw new Error("Invalid response received.");
    }

    // audio only
    const audio = raw.items.filter((item) => {
      const ext = (item.ext || item.extension || "").toLowerCase();
      return ["m4a","opus"].includes(ext);
    });

    return {
      title: raw.title || "unknown",
      thumbnail: raw.cover,
      duration: raw.duration,
      formats: audio.map((i) => ({
        quality: i.label || "audio",
        extension: i.ext || i.extension,
        url: i.url
      }))
    };
  } catch (err) {
    throw new Error("Audio extraction failed: " + err.message);
  }
}

module.exports = { getAudioFormats };
