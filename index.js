const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);
app.use(morgan("dev"));

// API Routes
app.use("/api/bluesky", require("./routes/bluesky"));
app.use("/api/capcut", require("./routes/capcut"));
app.use("/api/dailymotion", require("./routes/dailymotion"));
app.use("/api/douyin", require("./routes/douyin"));
app.use("/api/kuaishou", require("./routes/kuaishou"));
app.use("/api/linkedin", require("./routes/linkedin"));
app.use("/api/meta", require("./routes/facebookInsta"));
app.use("/api/pinterest", require("./routes/pinterest"));
app.use("/api/reddit", require("./routes/reddit"));
app.use("/api/spotify", require("./routes/spotify"));
app.use("/api/snapchat", require("./routes/snapchat"));
app.use("/api/soundcloud", require("./routes/soundcloud"));
app.use("/api/threads", require("./routes/threads"));
app.use("/api/tiktok", require("./routes/tiktok"));
app.use("/api/tumblr", require("./routes/tumblr"));
app.use("/api/twitter", require("./routes/twitter"));
// 🔥 New audio extractor route
app.use("/api/audio", require("./routes/audio"));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    author: "ASMIT ADK",
    endpoints: [
      "/api/audio/extract",
      "/api/bluesky",
      "/api/capcut",
      "/api/dailymotion",
      "/api/douyin",
      "/api/kuaishou",
      "/api/linkedin",
      "/api/meta",
      "/api/pinterest",
      "/api/reddit",
      "/api/snapchat",
      "/api/spotify",
      "/api/soundcloud",
      "/api/threads",
      "/api/tiktok",
      "/api/tumblr",
      "/api/twitter",
      "/api/audio,
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});

// 500 Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack || err.message);
  res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
