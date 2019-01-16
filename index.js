// import bot-config.json called with botConfig
const botConfig = require("./botconfig.json");
// import discord.js called with Discord
const Discord = require("discord.js");
// import fs called with fs
const fs = require("fs");

// create new Discord Client called with bot
const bot = new Discord.Client({ disableEveryone: true });

// call new Discord Collection with bot.commands
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  // if there's an error console log it
  if (err) console.log(err);

  // filter files for .js and call with jsFile
  let jsFile = files.filter(f => f.split(".").pop() === "js");

  if (jsFile.length <= 0) {
    // if jsFile is empty console log text
    console.log("couldn't find 'Commands'");
    return;
  }

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
  // call general channel using sChannel
  let sChannel = channel.guild.channels.find(`name`, "general");
  // send text to sChannel
  sChannel.send(`${channel} has been created!`);
});

// on "message"
bot.on("message", async message => {
  // if author is bot do nothing
  if (message.author.bot) return;

  // if DM do nothing
  if (message.channel.type === "dm") return;

  // set prefix to prefix in bot-config.json
  let prefix = botConfig.prefix;

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

// login bot using token in bot-config.json
bot.login(botConfig.token);
