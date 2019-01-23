const Discord = require("discord.js");
const errors = require("../utils/errors");
// !ban <@user> <reason>
module.exports.run = async (bot, message, args) => {
  // call mentioned user or arguments index 0 with bUser
  let bUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  // if no bUser reply with text
  if (!bUser) return message.channel.send("Couldn't find user!");

  // removes first arg
  args.shift();

  // call args joined with a space with kReason
  let bReason = args.join(" ");

  // if member doesn't have the permission to kick then reply with text
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return errors.noPerms(message, "BAN_MEMBERS");

  // if bUser has permission then reply with text
  if (bUser.hasPermission("BAN_MEMBERS"))
    return message.channel.send("That person can't be banned at this time!");

  // create new Discord RichEmbed and call with banEmbed
  let banEmbed = new Discord.RichEmbed()
    // set description to "Ban"
    .setDescription("Ban")
    // set spine color to red
    .setColor("#ff0000")
    // add field "Banned User" that displays "(bUser Name) with ID: (bUser.ID)"
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    // add field "Banned By" that displays "<@(Author Name)> with ID: (Author ID)"
    .addField(
      "Banned By",
      `<@${message.author.id}> with ID: ${message.author.id}`
    )
    // add field "Banned In" that displays channel command was used in
    .addField("Banned In", message.channel)
    // add field "Time" that displays timestamp
    .addField("Time", message.createdAt)
    // add field "Reason" that displays bReason
    .addField("Reason", bReason);

  // call "staff" channel by banChannel
  let banChannel = message.guild.channels.find(`name`, "staff");

  // if banChannel is missing reply with text
  if (!banChannel) return message.channel.send("Can't find incidents channel.");

  // ban bUser
  message.guild.member(bUser).ban(bReason);

  // send banEmbed to banChannel
  banChannel.send(banEmbed);

  return;
};

module.exports.help = {
  name: "ban"
};
