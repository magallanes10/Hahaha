module.exports.config = {
  name: "autobiostatus",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell",
  description: "Bot sets its own bio and report when it is active",
  usePrefix: true,
  commandCategory: "No Prefix",
  cooldowns: 0,
};

const cron = require("node-cron");
const moment = require("moment");
const prefix = `${global.config.PREFIX}`; // Your bot's prefix
const botName = `${global.config.BOTNAME}`;
const ownerName = `${global.config.BOTOWNER}`;

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;

  cron.schedule('0 * * * *', () => {
    var currentHour = moment().format('HH');
    var bioMessage;
    var currentTime = moment().format('MMM Do, h:mm:ss a');

    if(currentHour >= 8 && currentHour <= 11){
      bioMessage = `Good morning! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime} `;
    }else if(currentHour >= 12 && currentHour <= 18){
      bioMessage = `Good afternoon! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime}`;
    }else{
      bioMessage = `Hello! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime}`;
    }

    api.changeBio(bioMessage, (err) => {
      if (err) return console.log("ERR: "+err);
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
}

    module.exports.run = async ({ api, event, global, permssion, utils, client, Users }) => {
    api.changeBio(`Hey I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime} `, (e) => {
      if(e) api.sendMessage("An error occurred" + e, event.threadID); return api.sendMessage("Changed bot's profile to", event.threadID, event.messgaeID)
    }
    )
 }