const axios = require('axios');

module.exports.config = {
  name: "chesca",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes", //convert into mirai and Credits the api by Liane
  description: "asking questions with cheska",// tagalog only language 
usePrefix: false,
  commandCategory: "ai",
  usages: "cheska [your question]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(" ");
api.setMessageReaction("✅", event.messageID, () => { }, true);
  if (!args[0]);
 api.sendMessage(`Hi I'm Chesca Ai`, event.threadID, event.messageID);
  api.setMessageReaction("🗨️", event.messageID, () => { }, true);

  try {
    if (question) {
      const response = await axios.get(`https://school-project-lianefca.bene-edu-ph.repl.co/ask?query=${encodeURIComponent(question)}`);

      if (response.data) {
        const messageText = response.data.message;
        await api.sendMessage(messageText, event.threadID, event.messageID); api.setMessageReaction("💙", event.messageID, () => { }, true);

        console.log('Sent answer as a reply to the user');
      } else {
        throw new Error('Invalid or missing response from API');
      }
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
      event.threadID
    );
  }
};
