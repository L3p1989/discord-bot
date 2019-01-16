const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // call bot profile picture with `bIcon`
  let bIcon = bot.user.defaultAvatarURL;

  // create new Discord RichEmbed called with botEmbed
  let botEmbed = new Discord.RichEmbed()
    // set botEmbed description to "Bot Information"
    .setDescription("Bot Information")
    // set spine color to green
    .setColor("#15f153")
    //set botEmbed thumbnail to bIcon
    .setThumbnail(bIcon)
    // add field "Bot Name" with bot username
    .addField("Bot Name", bot.user.username)
    // add field "Created On" with time it was created
    .addField("Created On", bot.user.createdAt);

  return message.channel.send(botEmbed);
};

module.exports.help = {
  name: "botinfo"
};
