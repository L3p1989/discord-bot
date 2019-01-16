const Discord = require("discord.js");
// !say <text to say>
module.exports.run = async (bot, message, args) => {
  // if message sender doesn't have permission to manage messages
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      "you don't have sufficient permissions to use this command."
    );
  // join args with spaces and call with botMessage
  let botMessage = args.join(" ");
  // delete message with command
  message.delete().catch();
  // send botMessage to channel cmd was sent in
  message.channel.send(botMessage);
};

module.exports.help = {
  name: "say"
};
