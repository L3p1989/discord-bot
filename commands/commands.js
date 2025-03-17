const { handleMemberCommand } = require('./member');
const { handleMHCommand } = require('./mh');
const { handleFFXIVCommand } = require('./ffxiv');

async function handleCommands(message, client) {
    const member = message.guild.members.cache.get(message.author.id); // Get the member who sent the message
    if (!member) {
        message.reply(`Sorry ${message.author.username}, I couldn't find your member information.`);
        return;
    }

    // Find the "Member" role
    const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
    if (!memberRole) {
        message.reply(`The role 'Member' does not exist. Please contact an administrator.`);
        return;
    }

    // Check if the user has the "Member" role
    if (!member.roles.cache.has(memberRole.id)) {
        // If the user does not have the "Member" role, they can only use the !member command
        if (message.content.includes('!member')) {
            await handleMemberCommand(message, client, member, memberRole);
        } else {
            message.reply(`You need to have the Member role before using other commands. Please use the !member command first.`);
        }
        return;
    }

    // Handle the !MH command
    if (message.content.includes('!MH')) {
        await handleMHCommand(message, client, member);
    }

    // Handle the !FFXIV command
    if (message.content.includes('!FFXIV')) {
        await handleFFXIVCommand(message, client, member);
    }
}

module.exports = { handleCommands };