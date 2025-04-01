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

redisClient
  .connect()
  .then(() => console.log("✅ Redis Connected"))
  .catch((err) => console.error("❌ Redis Connection Error:", err));

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

// Use Routes
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

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));