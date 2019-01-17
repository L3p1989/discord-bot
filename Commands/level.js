const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const xp = require("../xp.json");
// !level
module.exports.run = async (bot, message, args) => {
  // if sender has no xp
  if (!xp[message.author.id]) {
    // create object
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  // call sender's xp with curXP
  let curXp = xp[message.author.id].xp;
  // call sender's level with curLvl
  let curLvl = xp[message.author.id].level;
  // call the number of xp needed to lvl up with nxtLvlXp
  let nxtLvlXp = curLvl * 300;
  // call difference in needed xp with lvlDiff
  let lvlDiff = nxtLvlXp - curXp;
  // call new RichEmbed with lvlEmbed
  let lvlEmbed = new Discord.RichEmbed()
    // set author to senders nickname
    .setAuthor(message.member.nickname)
    // set color to purple
    .setColor(purple)
    // add new field named "Level" with curLvl
    .addField("Level", curLvl, true)
    // add new field named "XP" with curXp
    .addField("XP", curXp, true)
    // set footer to show lvlDiff and users avatar
    .setFooter(`${lvlDiff} XP until level up`, message.member.user.avatarURL);
  // send lvlEmbed to sender's channel and then deletes it after 5s
  message.channel.send(lvlEmbed).then(msg => {
    msg.delete(5000);
  });
};

module.exports.help = {
  name: "level"
};
