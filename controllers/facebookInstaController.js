async function handleFacebookInstaDownload(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' query parameter." });
  }

  try {
    const data = await facebookInsta(url);

    // Remove or overwrite developer field
    if (data.developer) {
      data.developer = "@Asmit Adk"; // your name 😎
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
