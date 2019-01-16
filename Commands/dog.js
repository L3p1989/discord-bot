const Discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
  // wait for superAgent to get .json and call with body
  let { body } = await superAgent.get(`https://random.dog/woof.json`);
  // call new Discord Richembed with dogEmbed
  let dogEmbed = new Discord.RichEmbed()
    // set color to white
    .setColor("#ffffff")
    // set title to "Dog"
    .setTitle("Dog")
    // set image to url img
    .setImage(body.url);
  // call photos-screenshots with dogChannel
  let dogChannel = message.guild.channels.find(`name`, "photos-screenshots");
  // if no dogChannel reply with message
  if (!dogChannel)
    return message.reply("I couldn't find a channel for the dogs");
  // send dogEmbed to dogChannel
  dogChannel.send(dogEmbed);
};

module.exports.help = {
  name: "dog"
};
