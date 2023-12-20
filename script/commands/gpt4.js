const axios = require('axios');

module.exports.config = {
    name: "gpt4",
    version: "1.0",
    hasPermission: 0,
    credits: "SiAM | @Siam.The.Fox",
    description: "",
  usePrefix: false,
    commandCategory: "fun",
    usages: " ", // Modify it as needed
    cooldowns: 20,
};

module.exports.run = async function ({ api, args, event }) {
    const query = args.join(" ");

    if (!query) {
        return api.sendMessage("Please provide a query. Usage: /gpt4 'query'", event.threadID, event.messageID); api.sendMessage("🔍 | Gpt4 is Searching Please Wait....", event.threadID, event.messageID);
    }

    const userID = event.senderID; 

    try {
        const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${encodeURIComponent(query)}`);
        const answer = response.data.lastAnswer;

        await api.sendMessage(answer, event.threadID, event.messageID);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("Error fetching response...", event.threadID, event.messageID);
    }
};