const Discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superAgent.get(`https://random.dog/woof.json`);

  let dogEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setTitle("Dog")
    .setImage(body.url);

  let dogChannel = message.guild.channels.find(`name`, "photos-screenshots");

  if (!dogChannel)
    return message.reply("I couldn't find a channel for the dogs");

  dogChannel.send(dogEmbed);
};

module.exports.help = {
  name: "dog"
};
