module.exports.config = {
    name: "maintenance",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Jonell Magallanes",
    description: "Announce Bot maintenance due errors",
  usePrefix: true,
    commandCategory: "AdminBot",
    cooldowns: 5,
};

module.exports.run = function({ api, event, args }) {
    var fs = require("fs");
    var request = require("request");


    api.getThreadList(30, null, ["INBOX"], (err, list) => {
        if (err) { 
            console.error("ERR: "+ err);
            return;
        }
const target = args.join(" ");
          if (!target) return api.sendMessage("Please Enter Your Maintenance Message", event.threadID);
        list.forEach(thread => {
            if(thread.isGroup == true && thread.threadID != event.threadID) {
                var link = "https://i.postimg.cc/NFdDc0vV/RFq-BU56n-ES.gif";  
                var callback = () => api.sendMessage({ 
                    body: `${global.config.BOTNAME} BOT is has been maintenance. Please be patient.\n\nReason: ${target}\n\nDeveloper:Jonell Magallanes`, 
                    attachment: fs.createReadStream(__dirname + "/cache/maintenance.gif")
                }, 
                thread.threadID, 
                () => { 
                    fs.unlinkSync(__dirname + "/cache/maintenance.gif");
                    console.log(`Maintenance message sent to ${thread.threadID}. Now shutting down.`);
                    process.exit(); 
                });

                return request(encodeURI(link))
                    .pipe(fs.createWriteStream(__dirname + "/cache/maintenance.gif"))
                    .on("close", callback);
            }
        });
    });

    console.log("The bot is now off for maintenance.");
};