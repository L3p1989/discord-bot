const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  // if message sender doesn't have permission to manage guild reply with text
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(
      "You don't have sufficient permissions to use this command."
    );
  // if no arg is given/arg is help reply with text
  if (!args[0] || args[0 == "help"])
    return message.reply("Usage: !prefix <desired prefix here>");
  // parse JSON in prefixes and call with prefixes
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  // set prefixes by guild ID using arg
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  // update file with new arg
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
    if (err) console.log(err);
  });
  // new RichEmbed called with sEmbed
  let sEmbed = new Discord.RichEmbed()
    // set spine color to green
    .setColor("#009933")
    // set title to "Prefix Set!"
    .setTitle("Prefix Set!")
    // set Description to confirmation text
    .setDescription(`Set to ${args[0]}`);
  // send sEmbed to channel sent from
  message.channel.send(sEmbed);
};

module.exports.help = {
  name: "prefix"
};
