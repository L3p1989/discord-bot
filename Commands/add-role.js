const Discord = require("discord.js");
const errors = require("../utils/errors");
// !addrole <@user> <role>
module.exports.run = async (bot, message, args) => {
  // if member doesn't have permission to manage roles reply with text
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return errors.noPerms(message, "MANAGE_ROLES");

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
  if (!role) return message.reply("Specify a role!");

  // call specified role with gRole
  let gRole = message.guild.roles.find(`name`, role);

  // if role doesn't exist reply with text
  if (!gRole) return message.reply("Couldn't find that role.");

  // if rMember has the role reply with text
  if (rMember.roles.has(gRole.id))
    return message.reply("they already have that role.");

  // wait your turn and then add the role if no issues pop up
  await rMember.addRole(gRole.id);

  // try to send rMember a dm with text; if dm fails send to channel
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
