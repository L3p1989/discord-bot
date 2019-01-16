const Discord = require("discord.js");
const superAgent = require("superagent");
// !cat
module.exports.run = async (bot, message, args) => {
  // wait for superAgent to get url and call body with body
  let { body } = await superAgent.get(`http://aws.random.cat/meow`);
  // call new Discord RichEmbed with catEmbed
  let catEmbed = new Discord.RichEmbed()
    // set spine color to black
    .setColor("#000000")
    // set title to "Cat"
    .setTitle("Cat")
    // set image to img in body.file
    .setImage(body.file);
  // call #photos-screenshots with catChannel
  let catChannel = message.guild.channels.find(`name`, "photos-screenshots");
  // if no catChannel reply with text
  if (!catChannel)
    return message.reply("I couldn't find a channel for the cats");
  // send catEmbed to catChannel
  catChannel.send(catEmbed);
};

module.exports.help = {
  name: "cat"
};
