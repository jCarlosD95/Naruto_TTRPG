const Discord = require('discord.js');

const prefix = '!';

const client = new Discord.Client({
    allowedMentions: {
        parse: [`users`,`roles`],
        repliedUser: true,
    },
    intents: [
        'Guilds',
        'GuildMessages',
        //'GuildPresences',
        //'GuildMembers', //"GUILD_MEMBERS",
        'GuildMessageReactions', //"GUILD_MESSAGE_REACTIONS",
        'DirectMessages', //"DIRECT_MESSAGES",
    ],
});

client.on("ready", () => {
    console.log("Bot is online!")
})

client.login("MTEzMjQyOTgzMzU4Mjk0NDMzNw.GIQU-8.8c-dGRo9uUP7SwoCvHrM8HSfRpQ-h01B9YSgnQ")