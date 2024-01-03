const axios = require('axios');

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes", 
  description: "Get AI assistance",
  usePrefix: false,
  commandCategory: "ai",
  usages: "ai [your question]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://ai.easy0.xyz/v1/completion?model=gpt3.5&query=${query}`;

  // Notify user that AI is searching for an answer
  api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200 && response.data.model === "gpt3.5") {
      const aiResponse = response.data.response;

      // Sending AI response as a message
      api.sendMessage(aiResponse, event.threadID, event.messageID);
    } else {
      api.sendMessage("Sorry, something went wrong with the AI service.", event.threadID);
    }
  } catch (error) {
    api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID);
  }
};
