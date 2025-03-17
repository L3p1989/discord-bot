const { PermissionsBitField } = require('discord.js');

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
            try {
                const botMember = await message.guild.members.fetch(client.user.id); // Fetch the bot's member object
                console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
                console.log(`Bot highest role position: ${botMember.roles.highest.position}`);
                console.log(`Role to assign position: ${memberRole.position}`);
                if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles) && botMember.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
                    if (botMember.roles.highest.comparePositionTo(memberRole) > 0) {
                        // Check if the user is the server owner
                        if (message.guild.ownerId === message.author.id) {
                            message.reply(`OK ${member.displayName}, I have given you the Member role, but I cannot change your nickname as you are the server owner.`);
                            await member.roles.add(memberRole); // Assign the "Member" role to the server owner
                        } else {
                            // Ask for the in-game name
                            message.reply('Please provide your in-game name.');

                            // Collect the response
                            const filter = response => response.author.id === message.author.id;
                            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });

                            const inGameName = collected.first().content;
                            const newNickname = `[Member] ${inGameName}`;

                            // Change the nickname
                            await member.setNickname(newNickname);

                            // Assign the role
                            await member.roles.add(memberRole);
                            message.reply(`OK ${member.displayName}, I have given you the Member role and changed your nickname to ${newNickname}.`);
                        }
                    } else {
                        message.reply(`Sorry ${member.displayName}, my role is not high enough to assign the Member role.`);
                    }
                } else {
                    message.reply(`Sorry ${member.displayName}, I don't have permission to manage roles or nicknames.`);
                }
            } catch (error) {
                console.error('Error fetching bot member, changing nickname, or adding role:', error);
                message.reply(`An error occurred while trying to assign the role or change the nickname: ${error.message}`);
            }
        } else {
            message.reply(`You need to have the Member role before using other commands. Please use the !member command first.`);
        }
        return;
    }

    // Handle the !MH command
    if (message.content.includes('!MH')) {
        const role = message.guild.roles.cache.find(role => role.name === 'Monster Hunter'); // Find the "Monster Hunter" role
        if (!role) {
            message.reply(`The role 'Monster Hunter' does not exist. Please contact an administrator.`);
            return;
        }

        try {
            const botMember = await message.guild.members.fetch(client.user.id); // Fetch the bot's member object
            console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
            console.log(`Bot highest role position: ${botMember.roles.highest.position}`);
            console.log(`Role to assign position: ${role.position}`);
            if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                if (botMember.roles.highest.comparePositionTo(role) > 0) {
                    await member.roles.add(role); // Assign the "Monster Hunter" role to the member
                    message.reply(`OK ${member.displayName}, I have given you the MH role.`);
                } else {
                    message.reply(`Sorry ${member.displayName}, my role is not high enough to assign the MH role.`);
                }
            } else {
                message.reply(`Sorry ${member.displayName}, I don't have permission to manage roles.`);
            }
        } catch (error) {
            console.error('Error fetching bot member or adding role:', error);
            message.reply(`An error occurred while trying to assign the role: ${error.message}`);
        }
    }

    // Handle the !FFXIV command
    if (message.content.includes('!FFXIV')) {
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

    // Handle the !members command
    if (message.content.startsWith('!members')) {
        const members = await message.guild.members.fetch(); // Fetch all members in the guild
        message.reply(`There are ${members.size} members in this server.`);
    }
}

module.exports = { handleCommands };