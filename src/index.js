require('dotenv').config();
// This is a simple Discord bot that responds to messages and manages roles in a server.
const { Client, IntentsBitField } = require('discord.js');

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

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
}
);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.includes('!MH')) {
        const role = message.guild.roles.cache.find(role => role.name === 'Monster Hunter');
        if (role) {
            const member = message.guild.members.cache.get(message.author.id);
            if (member) {
                await member.roles.add(role);
                message.reply(`OK ${message.author.username} I have given you the MH role`);
            } else {
                message.reply(`Sorry ${message.author.username}, I couldn't find your member information.`);
            }
        } else {
            message.reply(`Sorry ${message.author.username}, I couldn't find the MH role.`);
        }
    }
    if (message.content.startsWith('!members')) {
        const members = await message.guild.members.fetch();
        message.reply(`There are ${members.size} members in this server.`);
    }
});

client.login(
    process.env.BOT_TOKEN
);