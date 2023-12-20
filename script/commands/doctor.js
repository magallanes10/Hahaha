module.exports.config = {
    name: "doctor",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Jonell Magallanes ",
    description: "Doctor AI that provides medicine advice",
  usePrefix: false,
    commandCategory: "health",
    usages: "[symptom]",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID } = event;
    let tid = threadID,
    mid = messageID;
    const symptoms = args.join(" "); api.setMessageReaction("👨‍⚕️", event.messageID, () => { }, true);
    if (!symptoms) return api.sendMessage("Please type a symptom or issue...", tid, mid); api.sendMessage("🩺 | Diagnosing Your Query! Please Wait....", tid, mid); api.setMessageReaction("🩺", event.messageID, () => { }, true);
    const content = `I am a Doctor AI, here to help you with your symptoms. Tell me more about: ${encodeURIComponent(symptoms)}`;
    try {
        const res = await axios.get(`https://api.kenliejugarap.com/blackbox/?text=${content}`);
        let respond = res.data.response;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, mid); api.setMessageReaction("💊", event.messageID, () => { }, true);
        } else {

            const doctor = ["Make sure to rest and stay hydrated.", "Please consult a medical professional if symptoms persist.", "Take the medicine with a meal to avoid stomach upset.", "Keep monitoring your symptoms and if they worsen, seek medical attention immediately."];
            const randomAdvice = doctor[Math.floor(Math.random() * doctor.length)];
            respond += `👨‍⚕️ As a Doctor AI, my initial advice is: ${randomAdvice}`;
            api.sendMessage(respond, tid, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};