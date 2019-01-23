const Discord = require("discord.js");
const coins = require("../coins.json");
// !coins
module.exports.run = async (bot, message, args) => {
  // if message sender has no coins
  if (!coins[message.author.id]) {
    //create js object
    coins[message.author.id] = {
      coins: 0
    };
  }
  // call message senders coins with uCoins
  let uCoins = coins[message.author.id].coins;
  // call new RichEmbed with coinEmbed
  let coinEmbed = new Discord.RichEmbed()
    // set author to message sender nickname
    .setAuthor(message.member.displayName)
    // set spine color to green
    .setColor("#00FF00")
    // add new field named ":moneybag:" that shows uCoins
    .addField(":moneybag:", uCoins);
  //send coinEmbed to sender channel for 5s
  message.channel.send(coinEmbed).then(msg => {
    msg.delete(5000);
  });
};

module.exports.help = {
  name: "coins"
};
