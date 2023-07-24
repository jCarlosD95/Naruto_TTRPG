const {token} = require('./config.js');
console.log(token);
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

client.login(token)