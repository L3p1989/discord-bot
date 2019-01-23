const Discord = require("discord.js");
// !serverinfo
module.exports.run = async (bot, message, args) => {
  // call server profile image with sIcon
  let sIcon = message.guild.iconURL;

  // create new Discord RichEmbed with serverEmbed
  let serverEmbed = new Discord.RichEmbed()
    // set serverEmbed description to "Server Information"
    .setDescription("Server Information")
    // set spine color to green
    .setColor("15f153")
    // set thumbnail to server profile image
    .setThumbnail(sIcon)
    // add field "Server Name"
    .addField("Server Name", message.guild.name)
    // add field "Created On" with created time
    .addField("Created On", message.guild.createdAt)
    // add field "You Joined" with member join time
    .addField("You Joined", message.member.joinedAt)
    // add field "Total Members" with member count
    .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverEmbed).then(m => m.delete(15000));
};

module.exports.help = {
  name: "serverinfo"
};
