module.exports.config = {
  name: "replit",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",// credits the api by hazeyy
  description: "Get response from Replit AI",
  usePrefix: false,
  aliases: "repl",
  commandCategory: "ai",
  usages: "replit [your question]",
  cooldowns: 10,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, args, client }) {
  const axios = require('axios');
  if (!args[0]) return api.sendMessage("Please Input Your Question", event.threadID, event.messageID);
  const question = encodeURIComponent(args.join(" "));
  const apiUrl = `https://hazeyy-api-useless.kyrinwu.repl.co/api/replit/ai?input=${question}`;

  try {
    api.sendMessage("⏱️ | Replit AI is Typing Just Please wait...", event.threadID, event.messageID);
    const response = await axios.get(apiUrl);
    if(response.data && response.data.bot_response && response.data.bot_response.trim() !== "") {
      api.sendMessage(response.data.bot_response, event.threadID, event.messageID);
    } else {
      api.sendMessage("Replit AI did not provide a valid response.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("Sorry, I can't get a response from Replit AI at the moment.", event.threadID, event.messageID);
    console.error(error);
  }
};