const Discord = require("discord.js");
// !8ball <question>
module.exports.run = async (bot, message, args) => {
  // if args index 2 doesn't exist
  if (!args[2]) return message.reply("Please ask a full question!");
  // create an Array with answers called with replies
  let replies = ["Yes.", "No.", "I don't know.", "Ask again later!"];
  // randomize a result based on index length of replies
  let result = Math.floor(Math.random() * replies.length);
  // start at args index 0 and join array together with spaces call with question
  let question = args.slice(0).join(" ");
  // new Discord RichEmbed
  let ballEmbed = new Discord.RichEmbed()
    // set author to message sender
    .setAuthor(message.message.displayName)
    // set spine color to orange
    .setColor("#FF9900")
    // add field "Question" with question
    .addField("Question", question)
    // add field "Answer" with replies index position result
    .addField("Answer", replies[result]);
  // send ballEmbed to channel message was sent
  message.channel.send(ballEmbed).then(m => m.delete(10000));
};

module.exports.help = {
  name: "8ball"
};
