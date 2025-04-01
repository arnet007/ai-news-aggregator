const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function summarizeArticle(articleText) {
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            { text: `Summarize this news article in 3 sentences:\n\n${articleText}` }
          ]
        }
      ]
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("❌ Error summarizing:", error.response?.data || error.message);
    return "Error generating summary.";
  }
}

module.exports = { summarizeArticle };
