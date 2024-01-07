const axios = require('axios');

module.exports.config = {
	name: "ai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jonell Magallanes",
	description: "EDUCATIONAL",
	usePrefix: false,
	commandCategory: "other",
	usages: "[question]",
	cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
	const query = encodeURIComponent(args.join(" "));
	const apiUrl = `https://cyni-api-collection.onrender.com/api/gpt?question=${query}`;

	try {
		api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);

		const response = await axios.get(apiUrl);
		const { ai } = response.data;

		api.sendMessage(ai, event.threadID, event.messageID);
	} catch (error) {
		console.error(error);
		api.sendMessage("An error occurred while processing your request.", event.threadID);
	}
};
    
