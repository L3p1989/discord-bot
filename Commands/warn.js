const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

// parse warnings.json into JS object called with `warns`
let warns = JSON.parse(fs.readFileSync("./warnings.json"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply(
      "you do not have sufficient permissions for this command."
    );

  let wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!wUser) return message.reply("I couldn't find that user");

  if (wUser.hasPermission("MANAGE_ROLES"))
    return message.reply("that user cannot receive warnings currently");

  args.shift();

  let reason = args.join(" ");

  if (!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0
    };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if (err) console.log("err");
  });

  let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#ff6600")
    .addField("Warned User", wUser.id)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

  let warnChannel = message.guild.channels.find(`name`, "staff");

  if (!warnChannel) return message.reply("I couldn't find the warn channel!");

  warnChannel.send(warnEmbed);

  if (warns[wUser.id].warns == 2) {
    let muteRole = message.guild.roles.find(`name`, "muted");
    if (!muteRole) return message.reply("that role no longer exists");

    let muteTime = "10s";
    await wUser.addRole(muteRole.id);
    message.channel.send(`${wUser.id} has been temporarily muted`);

    setTimeout(() => {
      wUser.removeRole(muteRole.id);
      message.reply(`they have been unmuted.`);
    }, ms(muteTime));
  }

  if (warns[wUser.id].warns == 3) {
    message.guild.member(wUser).ban(reason);
    message.reply(`${wUser.id} has been banned.`);
  }
};

module.exports.help = {
  name: "warn"
};
