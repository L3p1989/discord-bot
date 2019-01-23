const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors");

// parse warnings.json into JS object called with `warns`
let warns = JSON.parse(fs.readFileSync("./warnings.json"));
// !warn <@user> <reason>
module.exports.run = async (bot, message, args) => {
  // if sender doesn't have permission to manage roles reply with text
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return errors.noPerms(message, "MANAGE_ROLES");
  // call mentioned user/arg index 0 with wUser
  let wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  // if there's no wUser reply with text
  if (!wUser) return message.reply("I couldn't find that user");
  // if wUser has that permission reply with text
  if (wUser.hasPermission("MANAGE_ROLES"))
    return message.reply("that user cannot receive warnings currently");
  // removes first arg in args Array
  args.shift();
  // call args Array, joined by spaces, with reason
  let reason = args.join(" ");
  // if wUser ID is not in warns
  if (!warns[wUser.id])
    // create an object with ID as key
    warns[wUser.id] = {
      warns: 0
    };
  // adds 1 to users warns
  warns[wUser.id].warns++;
  // write new/updated object to warnings.json
  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if (err) console.log("err");
  });
  // new Discord RichEmbed called with warnEmbed
  let warnEmbed = new Discord.RichEmbed()
    // set description to "Warns"
    .setDescription("Warns")
    // set Author to message sender
    .setAuthor(message.author.username)
    // set spine color to orange
    .setColor("#ff6600")
    // add new field called "Warned User" with wUser ID
    .addField("Warned User", wUser.id)
    // add new field called "Warned In" with the channel message was sent in
    .addField("Warned In", message.channel)
    // add new field called "Number of Warnings" with the number of warns
    .addField("Number of Warnings", warns[wUser.id].warns)
    // add new field called "Reason" with reason arg
    .addField("Reason", reason);
  // call staff channel with warnChannel
  let warnChannel = message.guild.channels.find(`name`, "staff");
  // if no warnChannel reply with text
  if (!warnChannel) return message.reply("I couldn't find the warn channel!");
  // send warnEmbed to warnChannel
  warnChannel.send(warnEmbed);
  // if number of warns is equal to 2
  if (warns[wUser.id].warns == 2) {
    // call muted role with muteRole
    let muteRole = message.guild.roles.find(`name`, "muted");
    // if no muteRole reply with text
    if (!muteRole) return message.reply("that role no longer exists");
    // call "10s" with muteTime
    let muteTime = "10s";
    // wait and if no issues add muteRole to wUser
    await wUser.addRole(muteRole.id);
    // notify user has been muted in message channel
    message.channel.send(`${wUser.id} has been temporarily muted`);
    // set timeout function
    setTimeout(() => {
      // remove muteRole from wUser
      wUser.removeRole(muteRole.id);
      // reply with text
      message.reply(`they have been unmuted.`);
    }, ms(muteTime)); // set timeout time to muteTime
  }
  // if user warns is equal to 3
  if (warns[wUser.id].warns == 3) {
    // ban wUser
    message.guild.member(wUser).ban(reason);
    // reply with text notification of ban
    message.reply(`${wUser.id} has been banned.`);
  }
};

module.exports.help = {
  name: "warn"
};
