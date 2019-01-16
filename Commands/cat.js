const Discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superAgent.get(`http://aws.random.cat/meow`);

  let catEmbed = new Discord.RichEmbed()
    .setColor("#000000")
    .setTitle("Cat")
    .setImage(body.file);

  let catChannel = message.guild.channels.find(`name`, "photos-screenshots");

  if (!catChannel)
    return message.reply("I couldn't find a channel for the cats");

  catChannel.send(catEmbed);
};

module.exports.help = {
  name: "cat"
};
