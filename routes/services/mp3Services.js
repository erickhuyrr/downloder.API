const axios = require("axios");

async function fetchYouTubeData(url) {
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

    const data = res.data?.data;
    if (!data || !data.items || !data.title) {
      throw new Error("Invalid or empty response from Vidfly API");
    }

    // AUDIO ONLY — m4a + opus
    const audioFormats = data.items.filter(
      item =>
        item.type === "audio" &&
        ["m4a", "opus"].includes(item.ext || item.extension)
    );

    return {
      title: data.title,
      thumbnail: data.cover,
      duration: data.duration,
      formats: audioFormats.map(item => ({
        type: item.type,
        quality: item.label || "unknown",
        extension: item.ext || item.extension,
        url: item.url
      }))
    };

  } catch (err) {
    throw new Error(`YouTube downloader request failed: ${err.message}`);
  }
}

module.exports = { fetchYouTubeData };
