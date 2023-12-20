const axios = require('axios');

module.exports.config = {
  name: "globalgpt",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonel Magallanes ",
  description: "Asking Question With globalGPT",//CREDITS THE API
  usePrefix: false,
  commandCategory: "AI",
  usage: "globalgpt [message]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args, client, global }) => {
  let context = args.join(" ");
  if (!context) return api.sendMessage("Please Enter Your Question", event.threadID, event.messageID);
  api.sendMessage("⏱️ | GPT is Searching", event.threadID, event.messageID);
  const response = await axios.get(`https://api.easy0.repl.co/v1/globalgpt?q=${encodeURIComponent(context)}`);

  return api.sendMessage(response.data.content, event.threadID, event.messageID);
};