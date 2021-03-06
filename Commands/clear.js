const Discord = require("discord.js");
const errors = require("../utils/errors");
// !clear <amount>
module.exports.run = async (bot, message, args) => {
  // if message sender doesn't have permissions reply with message
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return errors.noPerms(message, "MANAGE_MESSAGES");
  // if no arg reply with text
  if (!args[0]) return message.reply("you need to specify a number to delete");
  // delete specified number of messages in channel then send message then delete message after 5s
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel
      .send(`Cleared ${args[0]} messages.`)
      .then(msg => msg.delete(10000));
  });
};

module.exports.help = {
  name: "clear"
};
