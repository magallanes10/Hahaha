const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0, 
  credits: "JV Barcenas & cyril", // Converted and modified to mirai by cyril //dont change credits or I spank your ass
  description: "ChatGPT-4",
  usePrefix: false,
  aliases: "chatgpt",
  commandCategory: "ChatBots",
  cooldowns: 20,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const prompt = event.body.trim();
    const { threadID, messageID } = event;

    if (!args[0]) {
      api.sendMessage(
        "Please provide a question to answer\n\nExample:\nai what is solar system?",
        threadID, 
        messageID 
      );
      return;
    }

    if (prompt) {
      await api.sendMessage("🔍 | Searching and Typing Your Answer! Please Wait....", threadID);

      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

      if (response.status === 200 && response.data && response.data.content) {
        const messageText = response.data.content.trim();
        await api.sendMessage(messageText, threadID, messageID);
        console.log('Sent answer as a reply to the user');
      } else {
        throw new Error('Invalid or missing response from API');
      }
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `${error.message}.\nAn error occurred fetching GPT API, please try again later.`,
      threadID
    );
  }
};;