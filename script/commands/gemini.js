const axios = require('axios');

module.exports.config = {
  name: "gemini",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "Ask questions with Gemini AI",
  usePrefix: false,
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 5,
};
  module.exports.run = async function ({ args, event, api }) {
    const content = args.join(" ");
    if (!content) {
      return api.sendMessage("Please provide your questions!", event.threadID, event.messageID);
    }
api.sendMessage("⏱️ | Gemini Searching Your Answer! Please wait..", event.threadID, event.messageID);
    try {
      const response = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${content}`);
      const candidates = response.data.candidates;
      if (candidates.length > 0) {
        const geminiResponse = candidates[0].content.parts.map(part => part.text).join(" ");
        return api.sendMessage(`${geminiResponse}`, event.threadID, event.messageID);
      } else {
        return api.sendMessage("Gemini didn't provide a valid response.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error making Gemini API request:", error.message);
      return api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
};
