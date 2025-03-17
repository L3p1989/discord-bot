const { PermissionsBitField } = require('discord.js');

async function handleFFXIVCommand(message, client, member) {
    const role = message.guild.roles.cache.find(role => role.name === 'FFXIV'); // Find the "FFXIV" role
    if (!role) {
        message.reply(`The role 'FFXIV' does not exist. Please contact an administrator.`);
        return;
    }

    try {
        const botMember = await message.guild.members.fetch(client.user.id); // Fetch the bot's member object
        console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
        console.log(`Bot highest role position: ${botMember.roles.highest.position}`);
        console.log(`Role to assign position: ${role.position}`);
        if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            if (botMember.roles.highest.comparePositionTo(role) > 0) {
                await member.roles.add(role); // Assign the "FFXIV" role to the member
                message.reply(`OK ${member.displayName}, I have given you the FFXIV role.`);
            } else {
                message.reply(`Sorry ${member.displayName}, my role is not high enough to assign the FFXIV role.`);
            }
        } else {
            message.reply(`Sorry ${member.displayName}, I don't have permission to manage roles.`);
        }
    } catch (error) {
        console.error('Error fetching bot member or adding role:', error);
        message.reply(`An error occurred while trying to assign the role: ${error.message}`);
    }
}

module.exports = { handleFFXIVCommand };