module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "august", //  PUTANG INA MO WAG MONG PAPALITAN TONG CREDITS WAG KANG KUPAL GAGO..
  description: "Guide for new users",
  commandCategory: "system",
  usages: "/help",
  usePrefix: true,
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 60
  }
};

  const mathSansBold = {
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
  j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
  s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭"
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("commands") != 0) return;
  const splitBody = body.slice(body.indexOf("commands")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermission == 0) ? getText("user") : (command.config.hasPermission == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = async function ({ api, event, args }) {
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;

  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  const categories = new Set();
  const categorizedCommands = new Map();

  for (const [name, value] of commands) {
    const categoryName = value.config.commandCategory;
    if (!categories.has(categoryName)) {
      categories.add(categoryName);
      categorizedCommands.set(categoryName, []);
    }
    categorizedCommands.get(categoryName).push(`│ ✧ ${value.config.name}`);
  }

  let msg = `Hey ${userName}, these are commands that may help your assignments and essays:\n`;

  for (const categoryName of categories) {
    const categoryNameSansBold = categoryName.split("").map(c => mathSansBold[c] || c).join("");
    msg += `╭─❍「 ${categoryNameSansBold} 」\n`;
    msg += categorizedCommands.get(categoryName).join("\n");
    msg += "\n╰───────────⟡\n";
  }

  const randomQuotes = [
  "Octopuses have three hearts: two pump blood to the gills, and one pumps it to the rest of the body.",
    "Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old.",
    "The world's oldest known recipe is for beer.",
    "Bananas are berries, but strawberries are not.",
    "Cows have best friends and can become stressed when they are separated.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896; Zanzibar surrendered after 38 minutes.",
    "The average person walks the equivalent of three times around the world in a lifetime.",
    "Polar bears are left-handed.",
    "The unicorn is Scotland's national animal.",
    "A group of flamingos is called a 'flamboyance'.",
    "There are more possible iterations of a game of chess than there are atoms in the known universe.",
    "The smell of freshly-cut grass is actually a plant distress call.",
    "A day on Venus is longer than its year.",
    "Honeybees can recognize human faces.",
    "Wombat poop is cube-shaped.",
    "The first oranges weren't orange.",
    "The longest time between two twins being born is 87 days.",
    "A bolt of lightning is six times hotter than the sun.",
    "A baby puffin is called a puffling.",
    "A jiffy is an actual unit of time: 1/100th of a second.",
    "The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo'.",
    "There's a species of jellyfish that is biologically immortal.",
    "The Eiffel Tower can be 6 inches taller during the summer due to the expansion of the iron.",
    "The Earth is not a perfect sphere; it's slightly flattened at the poles and bulging at the equator.",
    "A hummingbird weighs less than a penny.",
    "Koalas have fingerprints that are nearly identical to humans'.",
    "There's a town in Norway where the sun doesn't rise for several weeks in the winter, and it doesn't set for several weeks in the summer.",
    "A group of owls is called a parliament.",
    "The fingerprints of a koala are so indistinguishable from humans' that they have on occasion been confused at a crime scene.",
    "The Hawaiian alphabet has only 13 letters.",
    "The average person spends six months of their life waiting for red lights to turn green.",
    "A newborn kangaroo is about 1 inch long.",
    "The oldest known living tree is over 5,000 years old.",
    "Coca-Cola would be green if coloring wasn't added to it.",
    "A day on Mars is about 24.6 hours long.",
    "The Great Wall of China is not visible from space without aid.",
    "A group of crows is called a murder.",
    "There's a place in France where you can witness an optical illusion that makes you appear to grow and shrink as you walk down a hill.",
    "The world's largest desert is Antarctica, not the Sahara.",
    "A blue whale's heart is so big that a human could swim through its arteries.",
    "The longest word in the English language without a vowel is 'rhythms'.",
    "Polar bears' fur is not white; it's actually transparent.",
    "The electric chair was invented by a dentist.",
    "An ostrich's eye is bigger than its brain.",
    "Wombat poop is cube-shaped."
  ];

  const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  msg += `├─────☾⋆\n│ » Total commands: [ ${commands.size} ]\n│「 ☾⋆ PREFIX: ${global.config.PREFIX} 」\n╰──────────⧕\n\n𝗥𝗔𝗡𝗗𝗢𝗠 𝗙𝗔𝗖𝗧: ${randomQuote}\n\nOwner: ${global.config.BOTOWNER}`;


  return api.sendMessage(msg, threadID, async (error, info) => {
    if (autoUnsend) {
      await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
      return api.unsendMessage(info.messageID);
    } else return;
  });
};
