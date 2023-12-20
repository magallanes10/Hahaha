const fs = require('fs');

let bannedMembers = {};
let warnedMembers = new Set();

if(fs.existsSync('bannedMembers.json')) {
    bannedMembers = JSON.parse(fs.readFileSync('bannedMembers.json'));
}
if(fs.existsSync('warnedMembers.json')) {
    warnedMembers = new Set(JSON.parse(fs.readFileSync('warnedMembers.json')));
}

module.exports.config = {
  name: "ban",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "Ban or unban members from group chat via mention or uid",
  usePrefix: "true",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, message, mentions } = event;
  const action = args[0];
  let target = args[1];

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  const mentionUids = Object.keys(mentions);

  if(mentionUids.length > 0) {
    target = mentionUids[0];
  }

  if (action === 'ban' && target) {
    if (!bannedMembers[threadID]) {
      bannedMembers[threadID] = [];
    }
    bannedMembers[threadID].push(target);
    warnedMembers.delete(`${threadID}_${target}`);

    fs.writeFileSync('bannedMembers.json', JSON.stringify(bannedMembers));
    fs.writeFileSync('warnedMembers.json', JSON.stringify(Array.from(warnedMembers)));

    api.removeUserFromGroup(target, threadID);
    api.sendMessage(`🎯 | User ${target} has been banned.`, threadID);
  } else if (action === 'unban' && target) {
    const index = bannedMembers[threadID] ? bannedMembers[threadID].indexOf(target) : -1;
    if (index > -1) {
      bannedMembers[threadID].splice(index, 1);
      fs.writeFileSync('bannedMembers.json', JSON.stringify(bannedMembers));
      api.sendMessage(`✅ | User ${target} has been unbanned.`, threadID);
    } else {
      api.sendMessage(`📝 | User ${target} is not banned.`, threadID);
    }
  } else {
    api.sendMessage(`Invalid command. Use 'ban' or 'unban' with a target user.`, threadID);
  }
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, senderID } = event;

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (bannedMembers[threadID] && bannedMembers[threadID].includes(senderID)) {
    api.removeUserFromGroup(senderID, threadID);
    api.sendMessage({
      body: "🛡️ | Banned user tried to join. The user has been kicked from the group.",
      mentions: [{
        tag: senderID,
        id: senderID
      }]
    }, threadID);
  }
};