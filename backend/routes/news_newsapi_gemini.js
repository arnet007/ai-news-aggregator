const express = require("express");
const axios = require("axios");
const { summarizeArticle } = require("../services/summarizer");

const router = express.Router();

router.get("/fetch", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );

    const summarizedNews = await Promise.all(
      data.articles.slice(0, 5).map(async (article) => ({
        title: article.title,
        url: article.url,
        summary: await summarizeArticle(article.content || article.description),
      }))
    );

    res.json(summarizedNews);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;