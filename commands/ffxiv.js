// Import the necessary functions and classes from 'discord.js'
const { PermissionsBitField } = require('discord.js');
// Import the handleError function from the utilities folder
const { handleError } = require('../utilities/error');

// Define an asynchronous function to handle the !FFXIV command
async function handleFFXIVCommand(message, client, member) {
    // Find the "FFXIV" role in the guild
    const role = message.guild.roles.cache.find(role => role.name === 'FFXIV');
    if (!role) {
        // Reply to the user if the "FFXIV" role does not exist
        message.reply(`The role 'FFXIV' does not exist. Please contact an administrator.`);
        return;
    }

    try {
        // Fetch the bot's member object
        const botMember = await message.guild.members.fetch(client.user.id);
        console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
        console.log(`Bot highest role position: ${botMember.roles.highest.position}`);
        console.log(`Role to assign position: ${role.position}`);
        // Check if the bot has the necessary permissions
        if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            // Check if the bot's highest role is higher than the "FFXIV" role
            if (botMember.roles.highest.comparePositionTo(role) > 0) {
                // Assign the "FFXIV" role to the member
                await member.roles.add(role);
                message.reply(`OK ${member.displayName}, I have given you the FFXIV role.`);
            } else {
                // Reply to the user if the bot's role is not high enough
                message.reply(`Sorry ${member.displayName}, my role is not high enough to assign the FFXIV role.`);
            }
        } else {
            // Reply to the user if the bot does not have permission to manage roles
            message.reply(`Sorry ${member.displayName}, I don't have permission to manage roles.`);
        }
    } catch (error) {
        // Handle any errors that occur
        handleError(error, message, 'Error fetching bot member or adding role');
    }
}

// Export the handleFFXIVCommand function for use in other files
module.exports = { handleFFXIVCommand };