const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
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
  if (!role) return message.reply("Specify a role!");

  //
  let gRole = message.guild.roles.find(`name`, role);

  //
  if (!gRole) return message.reply("Couldn't find that role.");

  //
  if (rMember.roles.has(gRole.id))
    return message.reply("They already have that role.");

  //
  await rMember.addRole(gRole.id);

  //
  try {
    await rMember.send(`Congrats, you have been given the ${gRole.name} role!`);
  } catch (e) {
    message.channel.send(
      `Congrats <@${rMember.id}>, you have been given the ${gRole.name} role!`
    );
  }
};

module.exports.help = {
  name: "addrole"
};
