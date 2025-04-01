const express = require("express");
const axios = require("axios");
const { summarizeArticle } = require("../services/summarizer");

const router = express.Router();

router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.mediastack.com/v1/news?countries=in&access_key=${process.env.MEDIASTACK_API_KEY}`
    );

    // Ensure response structure matches expected format
    if (!response.data || !response.data.data) {
      throw new Error("Invalid API response structure");
    }

    const summarizedNews = await Promise.all(
      response.data.data.slice(0, 5).map(async (article) => ({
        title: article.title,
        url: article.url,
        image: article.image, // Added image field
        summary: await summarizeArticle(article.description || "No summary available."),
      }))
    );

    res.json(summarizedNews);
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;