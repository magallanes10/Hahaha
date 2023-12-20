//* Don't change this code if not destroy your files and don't steal it the code (by jonell Magallanes Project CC))
const express = require('express');
const fs = require('fs');
const { spawn } = require("child_process");
const chalk = require('chalk');
const path = require('path');
const axios = require("axios");
const app = express();
const PingMonitor = require('ping-monitor');
const pingOptions = {
  website: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
  title: 'EDUCATIONAL BOT 4.0V',
  interval: 1 // minutes
};

// Create a new Ping Monitor instance
const monitor = new PingMonitor(pingOptions);

monitor.on('up', (res) => {
  const pingTime = res.ping ? `${res.ping}ms` : 'N/A';
  console.log(chalk.green.bold(`${res.website} is UP. Ping Time: ${pingTime}`));
});

monitor.on('down', (res) => {
  console.log(chalk.red.bold(`${res.website} is DOWN. Status Message: ${res.statusMessage}`));
});

monitor.on('error', (error) => {
  console.log(chalk.red(`An error has occurred: ${error}`));
});

setInterval(() => {
  if (monitor.isRunning()) {
    console.log(chalk.green.bold('Uptime notification: The website is running smoothly.'));
  } else {
    console.log(chalk.red.bold('Uptime notification: The website is currently down.'));
  }
}, 3600000); // 60 minutes * 60 seconds * 1000 milliseconds

monitor.on('stop', (website) => {
  console.log(`${website} monitor has stopped.`);
});

monitor.start();

function ping(targetUrl) {
  const startPingTime = Date.now();

  axios.get(targetUrl)
    .then(() => {
      const latency = Date.now() - startPingTime;
      console.log(`Ping to ${targetUrl}: ${latency}ms`);
    })
    .catch((error) => {
      console.error(`Error pinging ${targetUrl}: ${error.message}`);
    });
}

// Example usage:
setInterval(() => {
  ping(`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
}, 30000); 
const config = require('./config.json'); 

const commandsPath = './script/commands'; 
const eventsPath = './script/events'; 

const getFilesCount = (dirPath) => {
  try {
    return fs.readdirSync(dirPath).length;
  } catch (e) {
    return 0;
  }
};


let startPingTime = Date.now();
let botStartTime = Date.now(); 

async function getBotInformation() {
  return {
    owner: {
      name: config.BOTOWNER,
      uid: config.ADMINUID,
    },
    bot: {
      name: config.BOTNAME,
      uid: config.ADMINUID,
      fmd: config.FCA,
      repl: config.REPL,
      lang: config.language,
      ping: Date.now() - startPingTime,
      },
    fca: {
      module: config.FCA,
    }
  };
}

function sendLiveData(socket) {
  setInterval(() => {
    const uptime = Date.now() - botStartTime;

    socket.emit('real-time-data', { uptime });
  }, 1000); 
}

app.get('/dashboard', async (req, res) => {
  const commandsCount = getFilesCount(commandsPath);
  const eventsCount = getFilesCount(eventsPath);
  const uptime = Date.now() - botStartTime;
  const botInformation = await getBotInformation();

  res.json({
    botPing:
     botInformation.bot.ping,
    botLang:
  botInformation.bot.lang,
    botRepl:
     botInformation.bot.repl,
    botFmd:
    botInformation.bot.fmd,
    botName: botInformation.bot.name,
    botUid: botInformation.bot.uid,
    ownerName: botInformation.owner.name,
    ownerUid: botInformation.owner.uid,
    prefix: config.PREFIX,
    commandsCount: commandsCount,
    eventsCount: eventsCount,
    uptime: uptime
  });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'harold.html')));


const http = require('http');
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('New client connected');
  sendLiveData(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

function startBot() {
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "umaru.js"], {
      cwd: __dirname,
      stdio: "inherit",
      shell: true
  });

  child.on("close", (codeExit) => {
    console.log(`Bot process exited with code: ${codeExit}`);
    if (codeExit !== 0) {
       setTimeout(startBot, 3000); 
    }
  });

  child.on("error", (error) => {
    console.error(`An error occurred starting the bot: ${error}`);
  });
}

startBot(); 

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Server with real-time updates running on http://localhost:${port}`);
});

module.exports = app;


//Modified by Jonell Magallanes 