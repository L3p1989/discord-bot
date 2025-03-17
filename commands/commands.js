const { handleError } = require('../utilities/error');
const { roles } = require('../utilities/config');
const commands = require('./index');

async function handleCommands(message, client) {
    const member = message.guild.members.cache.get(message.author.id); // Get the member who sent the message
    if (!member) {
        message.reply(`Sorry ${message.author.username}, I couldn't find your member information.`);
        return;
    }

    // Find the "Member" role
    const memberRole = message.guild.roles.cache.find(role => role.name === roles.member);
    if (!memberRole) {
        message.reply(`The role '${roles.member}' does not exist. Please contact an administrator.`);
        return;
    }

    // Check if the user has the "Member" role
    if (!member.roles.cache.has(memberRole.id)) {
        // If the user does not have the "Member" role, they can only use the !member command
        if (message.content.includes('!member')) {
            await commands.member.handleMemberCommand(message, client, member, memberRole);
        } else {
            message.reply(`Only members can request game roles.`);
        }
        return;
    }

    // Handle other commands
    if (message.content.includes('!MH')) {
        await commands.mh.handleMHCommand(message, client, member);
    } else if (message.content.includes('!FFXIV')) {
        await commands.ffxiv.handleFFXIVCommand(message, client, member);
    }
}

module.exports = { handleCommands };