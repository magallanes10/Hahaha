module.exports.config = {
	name: "autogreet",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Prince Sanel",
	description: "Bot Greet",
	commandCategory: "No Prefix",
	cooldowns: 0,
};
const fs = require("fs");
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
var { threadID, messageID } = event;
const cron = require("node-cron")
cron.schedule('0 0 0 * * *', () => {
  api.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? api.sendMessage("Goodmorning everyone, have a nice day!!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 8 * *', () => {
  api.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? api.sendMessage("Goodmorning everyone, Dont forget to eat your breakfast!!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 12 * *', () => {
  api.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? api.sendMessage("Goodnoon everyone, Dont forget to eat your lunch!!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
cron.schedule('0 0 15 * *', () => {
  api.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? api.sendMessage("Good afternoon everyone, Stay safe!!", now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
var link = [
   "https://i.imgur.com/nmpei2t.gif",
   "https://i.imgur.com/nmpei2t.gif",
]
	
var callback = () => api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/randomly.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/randomly.jpg"));
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/randomly.jpg")).on("close", () => callback());

}
module.exports.run = function({ api, event, client, __GLOBAL }) {

}


