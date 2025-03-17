const { handleError } = require('../utilities/error');
const { roles, commandPrefix } = require('../utilities/config');
const commands = require('./index');
const logger = require('../utilities/logger');

async function handleCommands(message, client) {
    try {
        const member = message.guild.members.cache.get(message.author.id); // Get the member who sent the message
        if (!member) {
            message.reply(`Sorry ${message.author.username}, I couldn't find your member information.`);
            return;
        }

        // Find the "Seraph" role
        const memberRole = message.guild.roles.cache.find(role => role.name === roles.member);
        if (!memberRole) {
            message.reply(`The role '${roles.member}' does not exist. Please contact an administrator.`);
            return;
        }

        // Check if the user has the "Seraph" role
        if (!member.roles.cache.has(memberRole.id)) {
            // If the user does not have the "Seraph" role, they can only use the !member command
            if (message.content.startsWith(`${commandPrefix}member`)) {
                await commands.member.handleMemberCommand(message, client, member, memberRole);
            } else {
                message.reply(`Only members can request game roles.`);
            }
            return;
        }

        // Handle other commands
        if (message.content.startsWith(`${commandPrefix}MH`)) {
            await commands.mh.handleMHCommand(message, client, member);
        } else if (message.content.startsWith(`${commandPrefix}FFXIV`)) {
            await commands.ffxiv.handleFFXIVCommand(message, client, member);
        }

        logger.info(`Command executed by ${member.displayName}: ${message.content}`);
    } catch (error) {
        console.error('Error handling command:', error);
        message.reply('An error occurred while processing your command. Please try again later.');
    }
}

module.exports = { handleCommands };