const { PermissionsBitField } = require('discord.js');
const { handleError } = require('../utilities/error');
const { roles } = require('../utilities/config');

async function handleMemberCommand(message, client, member, memberRole) {
    try {
        const botMember = await message.guild.members.fetch(client.user.id); // Fetch the bot's member object
        console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
        console.log(`Bot highest role position: ${botMember.roles.highest.position}`);
        console.log(`Role to assign position: ${memberRole.position}`);
        if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles) && botMember.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
            if (botMember.roles.highest.comparePositionTo(memberRole) > 0) {
                // Check if the user is the server owner
                if (message.guild.ownerId === message.author.id) {
                    message.reply(`OK ${member.displayName}, I have given you the ${roles.member} role, but I cannot change your nickname as you are the server owner.`);
                    await member.roles.add(memberRole); // Assign the "Seraph" role to the server owner
                } else {
                    // Ask for the in-game name
                    message.reply('Please provide your in-game name.');

                    // Collect the response
                    const filter = response => response.author.id === message.author.id;
                    const collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });

                    const inGameName = collected.first().content;
                    const newNickname = `[${roles.member}] ${inGameName}`;

                    // Change the nickname
                    await member.setNickname(newNickname);

                    // Assign the role
                    await member.roles.add(memberRole);
                    message.reply(`OK ${member.displayName}, I have given you the ${roles.member} role and changed your nickname to ${newNickname}.`);
                }
            } else {
                message.reply(`Sorry ${member.displayName}, my role is not high enough to assign the ${roles.member} role.`);
            }
        } else {
            message.reply(`Sorry ${member.displayName}, I don't have permission to manage roles or nicknames.`);
        }
    } catch (error) {
        handleError(error, message, 'Error fetching bot member, changing nickname, or adding role');
    }
}

module.exports = { handleMemberCommand };