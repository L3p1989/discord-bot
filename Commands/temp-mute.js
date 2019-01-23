const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utils/errors");
// !tempmute <@user> <time; ex: 10s = 10 seconds>
module.exports.run = async (bot, message, args) => {
  // call mentioned user or arguments index 0 with toMute
  let toMute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  // if there is no user to mute reply with text
  if (!toMute) return message.reply("Couldn't find user.");

  // if toMute has the manage messages permission reply with text
  if (toMute.hasPermission("MUTE_MEMBERS"))
    return message.reply("That user is not able to be muted at this time");

  if (!toMute.hasPermission("MUTE_MEMBERS"))
    return errors.noPerms(message, "MUTE_MEMBERS");

  // call muted role with muteRole
  let muteRole = message.guild.roles.find(`name`, "muted");

  // if no muteRole
  if (!muteRole) {
    try {
      // create muteRole
      muteRole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      });
      // remove permissions from muteRole
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  // argument 1 is mute time called with muteTime
  let muteTime = args[1];

  // if no muteTime specified reply with text
  if (!muteTime) return message.reply("You didn't specify a time!");

  // wait and then add role if no issues up until this point
  await toMute.addRole(muteRole.id);

  // reply with message that user has been muted
  message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);

  // set timeout time to remove role based on muteTime specified
  setTimeout(() => {
    toMute.removeRole(muteRole.id);
    message.channel.send(`<@${toMute.id}> has been unmuted!`);
  }, ms(muteTime));
};

module.exports.help = {
  name: "tempmute"
};
