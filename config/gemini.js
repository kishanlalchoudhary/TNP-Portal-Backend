const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const config = require("./env");

const model = new ChatGoogleGenerativeAI({
  apiKey: config.geminiApiKey,
  modelName: "gemini-2.0-flash",
});

module.exports = model;
