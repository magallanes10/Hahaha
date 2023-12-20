module.exports.config = {
  name: "ai2",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes ",
  description: "Asking question with openchat AI", //CREDITS THE API
  usePrefix: false,
  commandCategory: "AI",
  usage: "openchat [query]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  let target = args.join(" ");
  if (!target) return api.sendMessage("Please enter Your Question", event.threadID, event.messageID); 
  target = encodeURIComponent(target);
  api.sendMessage("🔍 | AI 2 is Searching Please Wait....", event.threadID, event.messageID);

  axios.get(`https://ai.easy-api.repl.co/api/openchat?query=${target}`)
    .then(response => {
     const { data } = response;
     if (data.status === 200 && data.content) {
       api.sendMessage(data.content, event.threadID, event.messageID);
     } else {
       api.sendMessage("An error occurred while getting a response from Zephyr.", event.threadID, event.messageID);
     }
    })
    .catch(error => {
      console.error(error);
      api.sendMessage("Failed to contact the Zephyr command service.", event.threadID, event.messageID);
    });
};