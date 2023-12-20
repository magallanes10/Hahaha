const path = require('path');
const fs = require('fs');

let badWordsActive = {}, bannedWords = {}, warnings = {};
const saveFile = path.join(__dirname, 'badwordsActive.json');

if (fs.existsSync(saveFile)) {
  const words = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  badWordsActive = words;
}

const saveWarnings = path.join(__dirname, 'warnings.json');

if (fs.existsSync(saveWarnings)) {
  const warningsData = JSON.parse(fs.readFileSync(saveWarnings, "utf8"));
  warnings = warningsData;
}

const saveWarningsCount = path.join(__dirname, 'warningsCount.json');
let warningsCount = {};
if (fs.existsSync(saveWarningsCount)) {
  const warningsCountData = JSON.parse(fs.readFileSync(saveWarningsCount, "utf8"));
  warningsCount = warningsCountData;
}

const loadBannedWords = threadID => {
  const wordFile = path.join(__dirname, `../commands/cache/${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = JSON.parse(fs.readFileSync(wordFile, "utf8"));
    bannedWords[threadID] = words;
  } else {
    bannedWords[threadID] = [];
  }
}
async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
};

module.exports.config = {
  name: "badwords",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Jonell Magallanes",
  description: "Manage and enforce banned words",
  usePrefix: true,
  aliases: "bw",
  noPrefix: "bwords",
  commandCategory: "admin",
  usages: "add [word] | remove [word] | list | on | off | unwarn [userID]",
  cooldowns: 5,
}

module.exports.handleEvent = async ({ api, event, isAdmin }) => {
  const { threadID, messageID, senderID, body } = event;
  loadBannedWords(threadID);
  if (!badWordsActive[threadID]) return;
  const adminUserIds = (await api.getThreadInfo(threadID)).adminIDs.map(i => i.id);
  if (adminUserIds.includes(senderID)) return; 
  const messageContent = body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    const threadInfo = await api.getThreadInfo(threadID);
    if (!threadInfo.adminIDs.some(item => item.id === api.getCurrentUserID())) return;

    warningsCount[senderID] = (warningsCount[senderID] || 0) + 1;
    fs.writeFileSync(saveWarningsCount, JSON.stringify(warningsCount), "utf8");
    if (warningsCount[senderID] === 2) {
      api.sendMessage(`${await getUserName(api, event.senderID)} You have two attempts to violate badwords. You are kicked from the group!`, threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
    } else {
      api.sendMessage(`Last Warning! ${await getUserName(api, event.senderID)} Your message has been detected to contain the offensive word "${messageContent}" If you continue to use such language, you will be automatically kicked`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args, message }) {
  const { threadID, messageID, mentions } = event;
  if (!args[0]) return api.sendMessage("📪 | Please specify an action (add, remove, list, on, off or unwarn)", threadID, messageID);

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(idInfo => idInfo.id === api.getCurrentUserID());
  if (!isAdmin) return api.sendMessage("🛡️ | Bot has Need Admin Privilege In short you need to promoted the bot as a admin of group chat!", threadID, messageID);

  const action = args[0];
  const word = args.slice(1).join(' ');
  loadBannedWords(threadID);

  switch (action) {
    case 'add':
      bannedWords[threadID].push(word.toLowerCase());
      fs.writeFileSync(path.join(__dirname, `../commands/cache/${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
      return api.sendMessage(`✅ | Word ${word} added to the badwords list.`, threadID);
    case 'remove':
      const index = bannedWords[threadID].indexOf(word.toLowerCase());
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        fs.writeFileSync(path.join(__dirname, `../commands/cache/${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
        return api.sendMessage(`✅ | Word ${word} removed from the badwords list.`, threadID);
      } else {
        return api.sendMessage(`❌ | Word ${word} not found.`, threadID);
      }
    case 'list':
      return api.sendMessage(`📝 | Badword List: \n${bannedWords[threadID].join(', ')}.`, threadID);
    case 'on':
      badWordsActive[threadID] = true;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | Badwords has been activated.`, threadID);
    case 'off':
      badWordsActive[threadID] = false;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | Badwords has been deactivated.`, threadID);
    case 'unwarn':
      let userIdsToUnwarn = [];
      if (args[1]) userIdsToUnwarn.push(args[1]);
      else if (mentions && Object.keys(mentions).length > 0) userIdsToUnwarn = userIdsToUnwarn.concat(Object.keys(mentions)); 
var id = Object.keys(event.mentions)[1] || event.senderID;
      for (const userID of userIdsToUnwarn) {
        warningsCount[userID] = 0;
        fs.writeFileSync(saveWarningsCount, JSON.stringify(warningsCount), "utf8");
        api.sendMessage(`✅ | ${id} warnings has been unwarned!`, threadID);
      }
      return;
    default:
      return api.sendMessage("📪 | Invalid Command. Please use 'add', 'remove', 'list', 'on', 'off' or 'unwarn'.", threadID);
  }
};