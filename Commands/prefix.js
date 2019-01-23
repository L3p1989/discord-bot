const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utils/errors");
// !prefix <desired prefix>
module.exports.run = async (bot, message, args) => {
  // if message sender doesn't have permission to manage guild reply with text
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return errors.noPerms(message, "MANAGE_GUILD");
  // parse JSON in prefixes and call with prefixes
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  // array of prefix symbols
  let pSymbols = [
    "~",
    "`",
    "!",
    "$",
    "%",
    "^",
    "&",
    "*",
    "|",
    "_",
    "-",
    "=",
    "+",
    "?",
    ",",
    "<",
    ".",
    ">"
  ];
  // for each pSymbol
  pSymbols.forEach(pSymbol => {
    // if args[0] equals pSymbol
    if (args[0] === pSymbol) {
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
    }
  });
  // if no arg or arg is "help"
  if (!args[0] || args[0] === "help")
    // reply with message
    return message.reply(
      `Usage: ${
        prefixes[message.guild.id].prefixes
      }prefix <desired prefix here>`
    );
};

module.exports.help = {
  name: "prefix"
};
