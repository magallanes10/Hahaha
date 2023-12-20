const axios = require('axios');

module.exports.config = {
  name: "palm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes", //convert into mirai and Credits the api Samir Œ
  description: "asking questions with palm",
  usePrefix: false,
  commandCategory: "ai",
  usages: "palm [your question]",
  cooldowns: 10,
};
module.exports.run = async function ({ api, event, args }) {
  const question = args.join(" ");
  api.setMessageReaction("⏱️", event.messageID, () => { }, true);

  if (!question) {
    return api.sendMessage("Please Enter your Question", event.threadID, event.messageID);
  } else {
    try {
      const response = await axios.get(
        `https://google.odernder.repl.co/palm?text=hi${encodeURIComponent(question)}`
      );
      const answer = response.data.output; api.setMessageReaction("🌴", event.messageID, () => { }, true);
      return api.sendMessage(answer, event.threadID, event.messageID); 
    } catch (error) {
      console.log(error);
      return api.sendMessage("📫 | No output found in the response", event.threadID);
    }
  }
};