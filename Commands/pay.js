const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../coins.json");

//pay <>
module.exports.run = async (bot, message, args) => {
  // if message sender has no coins
  if (!coins[message.author.id].coins) {
    // reply with message
    return message.reply("I'm sorry, but that's not possible!");
  }
  // call mentioned user/arg[0] with pUser
  let pUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  // if pUser has no coins
  if (!coins[pUser.id]) {
    // create JS object
    coins[pUser.id] = {
      coins: 0
    };
  }
  // call pUser's coins with pCoins
  let pCoins = coins[pUser.id].coins;
  // call message sender's coins with sCoins
  let sCoins = coins[message.author.id].coins;
  // if sCoins is less than amount reply with message
  if (sCoins < args[1]) return message.reply("you don't have enough!");
  // remove sent coins from sender's coins
  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };
  // add sent coins to pUser's coins
  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  // send message to sent channel
  message.channel.send(
    `${message.author} has given ${pUser} ${args[1]} coins!`
  );
  // write changes to coins.json
  fs.writeFile("./coins.json", JSON.stringify(coins), err => {
    // console log any errors
    if (err) console.log(err);
  });
};

module.exports.help = {
  name: "pay"
};
