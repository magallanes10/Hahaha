let messageCounts = {};
const spamThreshold = 10;
const spamInterval = 60000;
let spamDetectionActive = true;

module.exports.config = {
  name: "spamkick",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Jonell Magallanes and BLUE",
  description: "Automatically detect and act on spam",
  usePrefix: "true",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID } = event;
  const action = args[0];

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (action === 'on') {
    spamDetectionActive = true;
    api.sendMessage("🛡️ | Spam detection turned ON", threadID);
  } 
  else if (action === 'off') {
    spamDetectionActive = false;
    api.sendMessage("📪 | Spam detection turned OFF", threadID);
  }
  else {
    api.sendMessage(`Invalid command. Use 'on' or 'off'.`, threadID);
  }
};

module.exports.handleEvent = async function({ api, event }) {
  if (!spamDetectionActive) return;

  const { threadID, messageID, senderID } = event;

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (!messageCounts[threadID]) {
    messageCounts[threadID] = {};
  }

  if (!messageCounts[threadID][senderID]) {
    messageCounts[threadID][senderID] = {
      count: 1,
      timer: setTimeout(() => {
        delete messageCounts[threadID][senderID];
      }, spamInterval)
    };
  } else {
    messageCounts[threadID][senderID].count++;
    if (messageCounts[threadID][senderID].count > spamThreshold) {
      api.removeUserFromGroup(senderID, threadID);
      api.sendMessage({
        body: "🛡️ | Detected spamming. The user has been removed from the group.",
        mentions: [{
          tag: senderID,
          id: senderID
        }]
      }, threadID, messageID);
    }
  }
};