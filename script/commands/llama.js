module.exports.config = {
    name: "llama",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS",
    description: "Llama2 by KENLIEPLAYS",
usePrefix: false,
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 20,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("📫 | Please provide your question", tid, mid); api.sendMessage("🔍 | Llma is Searching Just Please Wait...", tid, mid);
    try {
        const res = await axios.get(`https://api.kenliejugarap.com/Llama2/?text=${content}`);
        const respond = res.data.response;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};