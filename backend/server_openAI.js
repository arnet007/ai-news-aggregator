require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const redis = require("redis");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { OpenAI } = require("openai");

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

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
});

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

// News Route with AI Summarization
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

    // Summarize each article using OpenAI GPT
    for (let article of newsData) {
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: `Summarize this article in 3 sentences: ${article.description}` }],
      });
      article.summary = summaryResponse.choices[0].message.content;
    }

    // Cache news for 30 minutes
    await redisClient.setEx("news", 1800, JSON.stringify(newsData));

    res.json(newsData);
  } catch (error) {
    console.error("❌ AI Summarization Error:", error);
    res.status(500).json({ error: "Failed to summarize news" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
