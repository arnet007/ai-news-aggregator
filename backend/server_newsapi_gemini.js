require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const redis = require("redis");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Redis Client Setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

// Google Gemini API Setup
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "news-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
require("./config/passport");

// Import Routes
const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");

// Routes
app.use("/news", newsRoutes);
app.use("/auth", authRoutes);

// Google OAuth Routes - Redirect to Frontend
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // ✅ Redirect to frontend
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.get("/auth/user", (req, res) => {
  res.json(req.user || null);
});

// News Route with AI Summarization (Using Gemini API)
app.get("/news", async (req, res) => {
  try {
    const cachedNews = await redisClient.get("news");
    if (cachedNews) {
      return res.json(JSON.parse(cachedNews));
    }

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    let newsData = response.data.articles;

    // Summarize each article using Gemini API
    for (let article of newsData) {
      try {
        const summaryResponse = await axios.post(GEMINI_URL, {
          contents: [
            {
              parts: [
                { text: `Summarize this news article in 3 sentences:\n\n${article.description || "No description available."}` }
              ]
            }
          ]
        });

        article.summary = summaryResponse.data.candidates[0].content.parts[0].text;
      } catch (err) {
        console.error("❌ Gemini Summarization Error:", err.response?.data || err.message);
        article.summary = "Error generating summary.";
      }
    }

    // Cache news for 30 minutes
    await redisClient.setEx("news", 1800, JSON.stringify(newsData));

    res.json(newsData);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));