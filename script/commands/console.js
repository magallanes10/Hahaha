const chalk = require('chalk');
const gradient = require('gradient-string');
const moment = require("moment-timezone");

module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Jonell Magallanes", //JONELL CC
  description: "Log all messages from different threads or group chats.",
  usePrefix: false,
  commandCategory: "Monitor",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  let { threadID, senderID, body } = event;
  var time = moment.tz("Asia/Manila").format("LLLL");

  // Getting the thread info
  const thread = await Threads.getInfo(threadID);
  const threadName = thread.threadName || "Unknown Group";

  // Skip logging if it's a message from the bot itself
  if (senderID === api.getCurrentUserID()) return;

  // Skip logging if the console is turned off for the thread
  if (thread.console === false) return;

  const gradientText = (text) => gradient('cyan', 'pink')(text);
  const boldText = (text) => chalk.bold(text);

  console.log(gradientText("━━━━━━━━━━[ DATABASE THREADS BOT LOGS ]━━━━━━━━━━"));
  console.log(gradientText("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"));
  console.log(`${boldText(gradientText(`┣➤ Group: ${threadName}`))}`);
  console.log(`${boldText(gradientText(`┣➤ Group ID: ${threadID}`))}`);
  console.log(`${boldText(gradientText(`┣➤ User ID: ${senderID}`))}`);
  console.log(`${boldText(gradientText(`┣➤ Content: ${body || "N/A"}`))}`);
  console.log(`${boldText(gradientText(`┣➤ Time: ${time}`))}`);
  console.log(gradientText("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"));
};

module.exports.run = async function ({ api, args, Users, event }) {
  // The run function is empty since the logs are handled by handleEvent
};