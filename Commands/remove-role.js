const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermissions("MANAGE_ROLES"))
    return message.reply(
      "you do not have sufficient permissions to use this command, sorry!"
    );

  //
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  //
  if (!rMember) return message.reply("I could not locate that user");

  //
  args.shift();

  //
  let role = args.join(" ");

  //
  if (!role) return message.reply("specify a role!");

  //
  let gRole = message.guild.roles.find(`name`, role);

  //
  if (!gRole) return message.reply("I couldn't find that role.");

  //
  if (!rMember.roles.has(gRole.id))
    return message.reply("they don't have that role.");

  //
  await rMember.removeRole(gRole.id);
};

module.exports.help = {
  name: "removerole"
};
