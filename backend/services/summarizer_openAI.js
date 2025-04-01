const axios = require("axios");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarizeArticle(articleText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI that summarizes news articles in a short, engaging way." },
        { role: "user", content: `Summarize this news article in 3 sentences:\n\n${articleText}` },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error summarizing:", error);
    return "Error generating summary.";
  }
}

module.exports = { summarizeArticle };