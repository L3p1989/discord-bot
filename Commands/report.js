const Discord = require("discord.js");
// !report <@user> <reason>
module.exports.run = async (bot, message, args) => {
  //call mentioned user or arguments index 0 with rUser
  let rUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  // if no rUser then return "Couldn't find user"
  if (!rUser) return message.channel.send("Couldn't find user");

  // removes first arg
  args.shift();

  // call args joined with a space with reason
  let reason = args.join(" ");

  // call new Discord RichEmbed with reportEmbed
  let reportEmbed = new Discord.RichEmbed()
    // set description field to "Reports"
    .setDescription("Reports")
    // set spine color to gold/yellow
    .setColor("#cc9900")
    // add field "Reported User" that displays "(rUser name) with ID: (rUser ID)"
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    // add field "Reported By" that displays "(Author's Username) with ID: (Author's ID)"
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    // add field "Channel" with reported channel
    .addField("Channel", message.channel)
    // add field "Time" with message timestamp
    .addField("Time", message.createdAt)
    // add field "Reason" with reason
    .addField("Reason", reason);

  // call staff channel finding by name, YOU COULD ALSO USE `name`, "reports" IF USING A "REPORTS"
  let reportsChannel = message.guild.channels.find(val => val.name === "staff");

  // if there is no reportsChannel reply with text
  if (!reportsChannel)
    return message.channel.send("Couldn't find reports channel!");

  // delete message and send report
  message.delete().catch(O_o => {});

  // send reportEmbed to reportsChannel
  reportsChannel.send(reportEmbed);

  // return message acknowledging report
  return message.channel.send(`Thanks! Your report has been submitted!`);
};

module.exports.help = {
  name: "report"
};
