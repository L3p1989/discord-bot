const Discord = require("discord.js");
// !kick <@user> <reason>
module.exports.run = async (bot, message, args) => {
  // call mentioned user or arguments index 0 with rUser
  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  // if no kUser reply with text
  if (!kUser) return message.channel.send("Couldn't find user!");

  // removes first arg
  args.shift();

  // call args joined with a space with kReason
  let kReason = args.join(" ");

  // if member doesn't have the permission to kick then reply with text
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "That's not possible! Why don't you try the !report command instead?"
    );

  // if kUser has permission then reply with text
  if (kUser.hasPermission("KICK_MEMBERS"))
    return message.channel.send("That person can't be kicked at this time!");

  // create new Discord RichEmbed and call with kickEmbed
  let kickEmbed = new Discord.RichEmbed()
    // set description to "Kick"
    .setDescription("Kick")
    // set color to deep orange
    .setColor("#e56b00")
    // add field "Kicked User" that displays "(kUser Name) with ID: (kUser.ID)"
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    // add field "Kicked By" that displays "<@(Author Name)> with ID: (Author ID)"
    .addField(
      "Kicked By",
      `<@${message.author.id}> with ID: ${message.author.id}`
    )
    // add field "Kicked In" that displays channel command was used in
    .addField("Kicked In", message.channel)
    // add field "Time" that displays timestamp
    .addField("Time", message.createdAt)
    // add field "Reason" that displays kReason
    .addField("Reason", kReason);

  // call "staff" channel by kickChannel
  let kickChannel = message.guild.channels.find(`name`, "staff");

  // if kickChannel is missing reply with text
  if (!kickChannel)
    return message.channel.send("Can't find incidents channel.");

  // kick kUser
  message.guild.member(kUser).kick(reason);

  // send kickEmbed to kickChannel
  kickChannel.send(kickEmbed);

  return;
};

module.exports.help = {
  name: "kick"
};
