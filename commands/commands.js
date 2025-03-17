// Import the necessary functions and configuration settings
const { handleError } = require('../utilities/error');
const { roles, commandPrefix } = require('../utilities/config');
const commands = require('./index');
const logger = require('../utilities/logger');

// Define an asynchronous function to handle commands
async function handleCommands(message, client) {
    // Get the member who sent the message
    const member = message.guild.members.cache.get(message.author.id);
    if (!member) {
        // Reply to the user if the member information is not found
        message.reply(`Sorry ${message.author.username}, I couldn't find your member information.`);
        return;
    }

    // Find the "Seraph" role
    const memberRole = message.guild.roles.cache.find(role => role.name === roles.member);
    if (!memberRole) {
        // Reply to the user if the "Seraph" role does not exist
        message.reply(`The role '${roles.member}' does not exist. Please contact an administrator.`);
        return;
    }

    // Check if the user has the "Seraph" role
    if (!member.roles.cache.has(memberRole.id)) {
        // If the user does not have the "Seraph" role, they can only use the !member command
        if (message.content.startsWith(`${commandPrefix}member`)) {
            await commands.member.handleMemberCommand(message, client, member, memberRole);
        } else {
            // Reply to the user if they do not have the "Seraph" role
            message.reply(`Only members can request game roles.`);
        }
        return;
    }

    // Handle the !MH command
    if (message.content.startsWith(`${commandPrefix}MH`)) {
        await commands.mh.handleMHCommand(message, client, member);
    } else if (message.content.startsWith(`${commandPrefix}FFXIV`)) {
        await commands.ffxiv.handleFFXIVCommand(message, client, member);
    }

    // Log the command execution
    logger.info(`Command executed by ${member.displayName}: ${message.content}`);
}

// Export the handleCommands function for use in other files
module.exports = { handleCommands };