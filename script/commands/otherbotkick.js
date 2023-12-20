// This variable determines whether the filter is on or off. True means on.
let otherBotFilterActive = true;

module.exports.config = {
  name: "otherbotkick",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Anne ÷ and Blue & Jonell", // Remodeled
  description: "Kick otherbot",
  usePrefix: true,
  commandCategory: "...",
  cooldowns: 0
};

module.exports.handleEvent = async ({
  event: o,
  api: t,
  Users: n
}) => {
  if (!otherBotFilterActive) return;

  var {
    threadID: e,
    messageID: a,
    body: b,
    senderID: s,
    reason: d
  } = o;
  const i = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss L");
  if (s == t.getCurrentUserID()) return;
  let c = await n.getNameUser(o.senderID);
  ["Other Bot"].forEach((a => {
    const haha = o.body;
    if (haha.includes("your keyboard level has reached level") || haha.includes("Command not found") || haha.includes("The command you used") || haha.includes("Uy may lumipad") || haha.includes("Unsend this message") || haha.includes("You are unable to use bot") || haha.includes("»» NOTICE «« Update user nicknames") || haha.includes("just removed 1 Attachments") || haha.includes("message removedcontent") || haha.includes("The current preset is") || haha.includes("Here Is My Prefix") || haha.includes("just removed 1 attachment.") || haha.includes("Unable to re-add members")) {
      modules = "[ BOT KICK ]", console.log(c, modules, a);
      const o = n.getData(s).data || {};
      n.setData(s, {
        data: o
      });
      t.removeUserFromGroup(s, e).then(() => {
        const groupName = t.getThreadInfo(e).threadName;
        const adminList = t.getThreadInfo(e).participantIDs.filter(id => t.getUserInfo(id).isAdmin);
        adminList.forEach(adminID => {
          t.sendMessage(`> ${c} < WAS KICKED FROM GROUP ${groupName}\n\nPlease make sure this user is a bot.`, adminID);
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }));
};

module.exports.run = function({ api, event, args }) {
  const { threadID } = event;
  const action = args[0];

  if (action === 'on') {
    otherBotFilterActive = true;
    api.sendMessage("Other bot filter is now ON.", threadID);
  } 
  else if (action === 'off') {
    otherBotFilterActive = false;
    api.sendMessage("Other bot filter is now OFF.", threadID);
  }
  else {
    api.sendMessage(`📪 | Invalid command. Use 'on' or 'off'.`, threadID);
  }
};