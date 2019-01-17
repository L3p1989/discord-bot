// import bot-config.json called with botConfig
const botConfig = require("./botconfig.json");
// import discord.js called with Discord
const Discord = require("discord.js");
// import fs called with fs
const fs = require("fs");
// import coins.json called with coins
const coins = require("./coins.json");
// call xp.json with xp
const xp = require("./xp.json");
// call botconfig purple with botPurple
const botPurple = botConfig.purple;
// create new Discord Client called with bot
const bot = new Discord.Client({ disableEveryone: true });
// call new Discord Collection with bot.commands
bot.commands = new Discord.Collection();

// read directory 'Commands'
fs.readdir("./Commands/", (err, files) => {
  // if there's an error console log it
  if (err) console.log(err);
  // filter files for .js and call with jsFile
  let jsFile = files.filter(f => f.split(".").pop() === "js");
  // if jsFile length is equal to/less than 0
  if (jsFile.length <= 0) {
    // console log text
    console.log("couldn't find 'Commands'");
    return;
  }
  // for each file in the jsFile Array
  jsFile.forEach((f, i) => {
    // call `./Commands/${f}` with props
    let props = require(`./Commands/${f}`);
    // console log text
    console.log(`${f} loaded!`);
    // adds command name to props
    bot.commands.set(props.help.name, props);
  });
});

// on "ready"
bot.on("ready", async () => {
  // console log (Bot Name) is online!
  console.log(`${bot.user.username} is online!`);

  // set activity to "Watching iBot"
  bot.user.setActivity("iBot", { type: "WATCHING" });
});

// on new member join
bot.on("guildMemberAdd", async member => {
  // console log member ID with text
  console.log(`${member.id} joined the server.`);
  // call welcome channel with welcomeChannel
  let welcomeChannel = member.guild.channels.find(`name`, "welcome");
  // send text to welcomeChannel
  welcomeChannel.send(
    `Welcome to the server ${member}! Please take a look at #rules for further instruction :cheeeese:`
  );
});

// on member leave
bot.on("guildMemberRemove", async member => {
  // console log member ID with text
  console.log(`${member.id} left the server.`);
  // call staff channel with leaveChannel
  let leaveChannel = member.guild.channels.find(`name`, "staff");
  // send text to staff notifying leave
  leaveChannel.send(`${member} left the server.`);
});

// on channel creation
bot.on("channelCreate", async channel => {
  // console log channel name with text
  console.log(`${channel.name} has been created.`);
  // call staff channel using sChannel
  let sChannel = channel.guild.channels.find(`name`, "staff");
  // send text to sChannel
  sChannel.send(`${channel} has been created!`);
});

//on channel deletion
bot.on("channelDelete", async channel => {
  //console log channel name with text
  console.log(`${channel.name} has been deleted.`);
  // call staff channel using sChannel
  let sChannel = channel.guild.channels.find(`name`, "staff");
  // send text to sChannel
  sChannel.send(`${channel.name} has been deleted!`);
});

// on "message"
bot.on("message", async message => {
  // if author is bot do nothing
  if (message.author.bot) return;
  // if DM do nothing
  if (message.channel.type === "dm") return;
  // parse JSON in prefixes.json and call with prefixes
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  // if no prefixes exist for guild
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      // set prefix to prefix in botconfig.json
      prefixes: botConfig.prefix
    };
  }
  // if message sender does not have coins
  if (!coins[message.author.id]) {
    // create new object
    coins[message.author.id] = {
      coins: 0
    };
  }
  // pull a random number between 1-15 call with coinAmt
  let coinAmt = Math.floor(Math.random() * 15) + 1;
  // pull a random number between 1-15 call with baseAmt
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  // if coinAmt is equal to baseAmt
  if (coinAmt === baseAmt) {
    // add coins to message senders coins
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
    // update coins.json
    fs.writeFile("./coins.json", JSON.stringify(coins), err => {
      // if error console log error
      if (err) console.log(err);
    });
    // call new RichEmbed with coinEmbed
    let coinEmbed = new Discord.RichEmbed()
      // set author to users nickname
      .setAuthor(message.member.nickname)
      // set spine color to blue
      .setColor("#0000FF")
      // add new field named ":moneybag:" and shows coins added
      .addField(":moneybag:", `${coinAmt} coins added!`);
    // send coinEmbed to message channel and then delete after 5s
    message.channel.send(coinEmbed).then(msg => {
      msg.delete(5000);
    });
  }
  // add random number between 7-15 call it with xpAdd
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  // if sender has no xp
  if (!xp[message.author.id]) {
    // create JS object
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  // take sender's level and multiply it by 300 then call that number with nxtLvl
  let nxtLvl = xp[message.author.id].level * 300;
  //
  let curLvl = xp[message.author.id].level;
  //
  let curXp = xp[message.author.id].xp;
  // take sender's xp and add xpAdd
  xp[message.author.id].xp = curXp + xpAdd;
  // if nxtLvl is less than or equal to curXP
  if (nxtLvl <= curXp) {
    // add 1 to message senders level
    xp[message.author.id].level = curLvl + 1;
    // call new RichEmbed with lvlUp
    let lvlUp = new Discord.RichEmbed()
      // set title to "Level Up!"
      .setTitle("Level Up!")
      // set color to purple
      .setColor(botPurple)
      // set thumbnail to message senders avatar
      .setThumbnail(message.member.user.avatarURL)
      // add field named "User" with sender's nickname
      .addField("User", message.member.nickname)
      // adds field "New Level" that shows new level
      .addField("New Level", curLvl + 1)
      // sets footer to "Congrats!"
      .setFooter("Congrats!");
    // send lvlUp to sender channel then delete after 5s
    message.channel.send(lvlUp).then(msg => {
      msg.delete(5000);
    });
  }
  // update file 'xp.json'
  fs.writeFile("./xp.json", JSON.stringify(xp), e => {
    if (e) console.log(e);
  });
  // call prefixes indexed by sent message guild ID prefixes by prefix
  let prefix = prefixes[message.guild.id].prefixes;
  // set message to array split by spacing
  let messageArray = message.content.split(" ");
  // set command to messageArray index 0
  let cmd = messageArray[0];
  // set args to anything starting from messageArray index 1
  let args = messageArray.slice(1);
  // call bot commands with commandFile
  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  // if commandFile exists run
  if (commandFile) commandFile.run(bot, message, args);
  // let role-assignment channel be called by rAssignment
  let rAssignment = message.guild.channels.find(`name`, "role-assignment");
  // let the Member role be called by mRole
  let mRole = message.guild.roles.find(`name`, "Member");
  // if user already has role do nothing
  if (message.member.roles.has(mRole.id)) return;
  // if message was received in role-assignment assign mRole
  if (message.channel === rAssignment) {
    message.member.addRole(mRole);
    message.guild.channels
      .find(`name`, "general")
      .send(
        `${message.member} has accepted membership! Welcome to ${
          message.guild.name
        }!`
      );
  }
});

// login bot using token in botconfig.json
bot.login(botConfig.token);
