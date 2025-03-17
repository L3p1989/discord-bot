require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, Partials } = require('discord.js'); // Import necessary classes from discord.js
const { handleCommands } = require('../commands/commands'); // Import the handleCommands function

// Create a new Discord client with specified intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
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

    channel.send(`Welcome to the server, ${member.displayName}! Please check the pinned message in the #welcome channel to get started.`);
});

// Event listener for when a message is created
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    // Ignore commands in channels other than "general"
    if (message.channel.name !== 'general') return;

    // Handle commands
    await handleCommands(message, client);
});

// Log in to Discord with the bot token
client.login(process.env.BOT_TOKEN); // Use the token from the .env file for security