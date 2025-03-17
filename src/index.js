require('dotenv').config(); // Load environment variables from .env file
const { Client, IntentsBitField, PermissionsBitField, Colors } = require('discord.js'); // Import necessary classes from discord.js

// Create a new Discord client with specified intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildScheduledEvents,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions
    ]
});

// Event listener for when the bot is ready
client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`); // Log the bot's username when it is ready
});

// Event listener for when a new member joins the server
client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general'); // Find the "general" channel
    if (!channel) return; // If the "general" channel doesn't exist, do nothing

    channel.send(`Welcome to the server, ${member}! Please check the pinned message in the #welcome channel to get started.`);
});

// Event listener for when a message is created
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    // Ignore commands in channels other than "general"
    if (message.channel.name !== 'general') return;

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
                            message.reply(`OK ${message.author.username}, I have given you the Member role, but I cannot change your nickname as you are the server owner.`);
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
                            message.reply(`OK ${message.author.username}, I have given you the Member role and changed your nickname to ${newNickname}.`);
                        }
                    } else {
                        message.reply(`Sorry ${message.author.username}, my role is not high enough to assign the Member role.`);
                    }
                } else {
                    message.reply(`Sorry ${message.author.username}, I don't have permission to manage roles or nicknames.`);
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
                    message.reply(`OK ${message.author.username}, I have given you the MH role.`);
                } else {
                    message.reply(`Sorry ${message.author.username}, my role is not high enough to assign the MH role.`);
                }
            } else {
                message.reply(`Sorry ${message.author.username}, I don't have permission to manage roles.`);
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
});

// Log in to Discord with the bot token
client.login(process.env.BOT_TOKEN); // Use the token from the .env file for security