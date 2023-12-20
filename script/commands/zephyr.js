module.exports.config = {
  name: "Zephyr",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes ",
  description: "Asking question with Zephyr AI", //CREDITS THE API
  usePrefix: false,
  commandCategory: "messenger bot",
  usage: "Zephyr [query]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  let cc = args.join(" ");
  if (!cc) return api.sendMessage("Please enter Your Question", event.threadID, event.messageID); 
  cc = encodeURIComponent(cc);
  api.sendMessage("🔍 | Zephyr AI is Searching Please Wait....", event.threadID, event.messageID);

  axios.get(`https://ai.easy-api.repl.co/api/zephyr?query=${cc}`)
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