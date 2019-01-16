const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // if args index 2 doesn't exist
  if (!args[2]) return message.reply("Please ask a full question!");
  // create an Array with answers called with replies
  let replies = ["Yes.", "No.", "I don't know.", "Ask again later!"];
  // randomize a result based on index length of replies
  let result = Math.floor(Math.random() * replies.length);
  //
  let question = args.slice(0).join(" ");
  //
  let ballEmbed = new Discord.RichEmbed()
    //
    .setAuthor(message.author.tag)
    //
    .setColor("#FF9900")
    //
    .addField("Question", question)
    //
    .addField("Answer", replies[result]);
  //
  message.channel.send(ballEmbed);
};

module.exports.help = {
  name: "8ball"
};
