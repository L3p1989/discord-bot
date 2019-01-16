const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // if member doesn't have permission to manage roles reply with text
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply(
      "you do not have sufficient permissions to use this command, sorry!"
    );

  //call mentioned user or arguments index 0 with rMember
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  // if no rMember reply with text
  if (!rMember) return message.reply("I could not locate that user");

  // removes first arg
  args.shift();

  // call args joined with a space with role
  let role = args.join(" ");

  // if member didn't specify a role
  if (!role) return message.reply("specify a role!");

  // call specified role with gRole
  let gRole = message.guild.roles.find(`name`, role);

  // if role doesn't exist reply with text
  if (!gRole) return message.reply("I couldn't find that role.");

  // if rMember doesn't have the role reply with text
  if (!rMember.roles.has(gRole.id))
    return message.reply("they don't have that role.");

  // wait your turn and then remove the role if no issues pop up
  await rMember.removeRole(gRole.id);
};

module.exports.help = {
  name: "removerole"
};
