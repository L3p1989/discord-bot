const Discord = require("discord.js");
const errors = require("../utils/errors");
// !say <text to say>
module.exports.run = async (bot, message, args) => {
  // if message sender doesn't have permission to manage messages
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return errors.noPerms(message, "MANAGE_MESSAGES");
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
