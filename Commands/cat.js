const Discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superAgent.get(`http://aws.random.cat/meow`);

  let catEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setTitle("Cat")
    .setImage(body.file);

  message.channel.send(catEmbed);
};

module.exports.help = {
  name: "cat"
};
