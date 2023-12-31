const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Jonell Magallanes',
  description: 'Ask a question to AI',
  commandCategory: 'ai',
  usages: ['ai <your question>'],
  cooldowns: 20,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length < 1) {
    return api.sendMessage('Please provide a question\n\nExample:\nAi what is solar system?', event.threadID, event.messageID);
  }
api.sendMessage("🔍 | AI is Searching and Typing your answer. Please Wait.....", event.threadID, event.messageID);
  const content = encodeURIComponent(args.join(' '));
  const apiUrl = `https://hazeyy-gpt4-api.kyrinwu.repl.co/api/gpt4/v-3beta?content=${content}`;

  try {
    const response = await axios.get(apiUrl);
    const reply = response.data.reply;

    api.sendMessage(reply, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching AI response:', error);
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
